// Define the form element
const form = document.getElementById('feedback-form');

// Define the canvas element
const chartCanvas = document.getElementById('feedback-chart');

// Define the chart context
const chartContext = chartCanvas.getContext('2d');

// Define the chart configuration options
const chartOptions = {
    type: 'bar',
    data: {
        labels: ['Product Performance', 'Product Durability', 'Product Design'],
        datasets: [{
            label: 'Feedback Results',
            data: [0, 0, 0],
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 10,
                title: {
                    display: true,
                    text: 'Score'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Question'
                }
            }
        }
    }
};

// Define the chart object
const feedbackChart = new Chart(chartContext, chartOptions);

// Define the form submission handler
form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get the form data
    const formData = new FormData(form);

    // Get the form values
    const productPerformance = formData.get('product-performance');
    const productDurability = formData.get('product-durability');
    const productDesign = formData.get('product-design');

    // Validate the form values
    if (productPerformance && productDurability && productDesign) {
        // Calculate the feedback scores
        const feedbackScores = [
            calculateFeedbackScore(productPerformance),
            calculateFeedbackScore(productDurability),
            calculateFeedbackScore(productDesign)
        ];

        // Update the chart data
        feedbackChart.data.datasets[0].data = feedbackScores;
        feedbackChart.update();

        // Reset the form
        form.reset();
    } else {
        alert('Please answer all questions before submitting.');
    }
});

// Define the feedback score calculation function
function calculateFeedbackScore(feedbackValue) {
    switch (feedbackValue) {
        case 'very-satisfied':
            return 10;
        case 'satisfied':
            return 8;
        case 'neutral':
            return 6;
        case 'unsatisfied':
            return 4;
        case 'very-unsatisfied':
            return 2;
        default:
            return 0;
    }
}