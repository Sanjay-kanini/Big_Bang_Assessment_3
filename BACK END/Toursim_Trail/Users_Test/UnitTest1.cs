// FeedbackControllerTests.cs

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using Tours.Controllers;
using Tours.Interface;
using Tours.Models;
using Tours.Service;

namespace Tours.Tests
{
    [TestFixture]
    public class FeedbackControllerTests
    {
        private Mock<IItinerary> _mockItineraryService;
        private ItineraryController itinerary_controller;

        private Mock<IFeedback> _mockRepository;

        private FeedbackController _controller;

        private Tour_AgencyController agency_controller;
        private Mock<ITour_agency> agency_mock;

        [SetUp]
        public void SetUp()
        {
            _mockRepository = new Mock<IFeedback>();
            _controller = new FeedbackController(_mockRepository.Object);
            _mockItineraryService = new Mock<IItinerary>();
            itinerary_controller = new ItineraryController(_mockItineraryService.Object);
            agency_mock = new Mock<ITour_agency>();
            agency_controller = new Tour_AgencyController(agency_mock.Object);
        }

        [Test]
        public async Task GetAllFeedback_ReturnsOkResult()
        {
            // Arrange
            var feedbacks = new List<Feedback>
            {
                new Feedback { feedback_id = 1, user_id = 1, rating = 5, feedback = "Great experience" },
                new Feedback { feedback_id = 2, user_id = 2, rating = 4, feedback = "Enjoyed the tour" }
            };

            _mockRepository.Setup(repository => repository.GetAllFeedbacks()).ReturnsAsync(feedbacks);

            // Act
            var result = await _controller.GetAllFeedback();

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result.Result);
            var okResult = result.Result as OkObjectResult;
            Assert.IsInstanceOf<IEnumerable<Feedback>>(okResult.Value);
            var returnedFeedbacks = okResult.Value as IEnumerable<Feedback>;
            Assert.AreEqual(feedbacks.Count, returnedFeedbacks.Count());
        }

        [Test]
        public async Task PostFeedback_ValidFeedback_ReturnsCreatedResponse()
        {
            // Arrange
            var feedback = new Feedback { user_id = 1, rating = 5, feedback = "Great experience" };
            _mockRepository.Setup(service => service.Add_Feedback(It.IsAny<Feedback>()))
                                .ReturnsAsync(feedback);

            // Act
            var result = await _controller.PostFeedback(feedback);

            // Assert
            Assert.IsInstanceOf<CreatedAtActionResult>(result.Result);
            var createdResult = (CreatedAtActionResult)result.Result;

            // Ensure that the action name and value are correct
            Assert.AreEqual("GetFeedback", createdResult.ActionName);
            Assert.AreEqual(feedback, createdResult.Value);
        }
        [Test]
        public async Task PostFeedback_FailedToAddFeedback_ReturnsProblemResponse()
        {
            // Arrange
            var feedback = new Feedback { user_id = 1, rating = 5, feedback = "Great experience" };
            _mockRepository.Setup(service => service.Add_Feedback(It.IsAny<Feedback>()))
                                .ReturnsAsync((Feedback)null);

            // Act
            var result = await _controller.PostFeedback(feedback);

            // Assert
            Assert.IsInstanceOf<BadRequestObjectResult>(result.Result);
            var badRequestResult = (BadRequestObjectResult)result.Result;
            Assert.AreEqual(StatusCodes.Status400BadRequest, badRequestResult.StatusCode);
            Assert.AreEqual("Failed to create Feedback.", badRequestResult.Value);
        }


        [Test]
        public async Task GetAllItinerary_ReturnsOkResultWithData()
        {
            // Arrange
            var mockItineraryData = new List<Itinerary>
            {
                new Itinerary { itinerary_id = 1, day = 1, location = "Location 1", description = "Description 1" },
                new Itinerary { itinerary_id = 2, day = 2, location = "Location 2", description = "Description 2" }
            };
            _mockItineraryService.Setup(service => service.GetAllItinerary())
                                 .ReturnsAsync(mockItineraryData);

            // Act
            var result = await itinerary_controller.GetAllItinerary();

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = (OkObjectResult)result;
            Assert.AreEqual(200, okResult.StatusCode);

            var itineraryData = (List<Itinerary>)okResult.Value;
            Assert.AreEqual(mockItineraryData.Count, itineraryData.Count);
            // You can add more assertions based on your actual data and expectations
        }

        [Test]
        public async Task GetAllItinerary_ReturnsInternalServerErrorOnException()
        {
            // Arrange
            _mockItineraryService.Setup(service => service.GetAllItinerary())
                                 .ThrowsAsync(new Exception("Test exception"));

            // Act
            var result = await itinerary_controller.GetAllItinerary();

            // Assert
            Assert.IsInstanceOf<StatusCodeResult>(result);
            var statusCodeResult = (StatusCodeResult)result;
            Assert.AreEqual(500, statusCodeResult.StatusCode);
        }



    }
}
