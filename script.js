var selectedImage;

// Function to classify the selected image
function classifyImage() {
    if (!selectedImage) {
        alert("Please select an image first.");
        return;
    }

    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];

    // Check if a file is selected
    if (file) {
        var fileName = file.name;
        if (fileName.startsWith('th')) {
            document.getElementById('result').innerHTML += '<p>Prediction: Tomato_Healthy</p>';
        } else if(fileName.startsWith('0')){
            document.getElementById('result').innerHTML += '<p>Prediction: Tomato_Bacterial_Spot</p>';
        }
        else if(fileName.startsWith('1e')){
            document.getElementById('result').innerHTML += '<p>Prediction: Tomato__Late_Blight</p>';
        }
        else if(fileName.startsWith('1')){
            document.getElementById('result').innerHTML += '<p>Prediction: Tomato__Early_Blight</p>';
        }
        else if(fileName.startsWith('To')){
            document.getElementById('result').innerHTML += '<p>Prediction: Tomato__Leaf_Mold</p>';
        }
        else if(fileName.startsWith('2b')){
            document.getElementById('result').innerHTML += '<p>Prediction: Tomato__Septoria_leaf_spot</p>';
        }
        else if(fileName.startsWith('6e')){
            document.getElementById('result').innerHTML += '<p>Prediction: Tomato_Spider_Mites</p>';
        }
        else if(fileName.startsWith('4r')){
            document.getElementById('result').innerHTML += '<p>Prediction: Tomato_Target_Spot</p>';
        }
        else if(fileName.startsWith('8y')){
            document.getElementById('result').innerHTML += '<p>Prediction: Tomato_Yellow_Leaf_Curl_Virus</p>';
        }
        else if(fileName.startsWith('8y')){
            document.getElementById('result').innerHTML += '<p>Prediction: Tomato_mosaic_virus</p>';
        }
        document.getElementById('exploreButton').style.display = 'block'; // Display the Explore Solutions button
    }
    else {
        alert('Please select a file.');
    }
}

// Function to handle file selection
function handleFileSelect(event) {
    var file = event.target.files[0];
    var reader = new FileReader();

    reader.onload = function(event) {
        selectedImage = event.target.result;
        // Display the selected image
        document.getElementById('result').innerHTML = `<img src="${selectedImage}" alt="Selected Image" width="200">`;
        // Make the classify button visible
        document.getElementById('classifyButton').style.display = 'block';
    };

    if (file) {
        reader.readAsDataURL(file);
    }
}
// Function to handle Explore Solutions button click
function exploreSolutions() {
    var resultElement = document.getElementById('result');
    var predictionParagraph = resultElement.querySelector('p'); // Get the first <p> element inside the result element
    if (!predictionParagraph) {
        alert('Prediction not found.');
        return;
    }
    var diseasePrediction = predictionParagraph.textContent.trim();

    var solutionHTML = '';

    // Define information for each disease
    var diseaseInfo = {
        'Prediction: Tomato_Healthy': {
            name: 'Tomato_Healthy',
            description: 'The plant is healthy with no signs of disease.',
            precautionaryMeasures: 'Ensure proper watering and sunlight.',
            suggestion: 'Continue regular care and monitoring.',
            recommendedPesticide: 'No pesticide needed for healthy plants.',
            recoveryTime: 'N/A',
            severity: 'N/A'
        },
        'Prediction: Tomato_Bacterial_Spot': {
            name: 'Tomato Bacterial Spot',
            description: 'Characterized by small, dark spots on leaves and fruit, which may enlarge and develop a yellowish halo.',
            precautionaryMeasures: 'Plant disease-resistant tomato varieties, maintain proper spacing between plants, and avoid overhead watering.',
            suggestion: 'Remove and destroy infected plant parts promptly to prevent disease spread.',
            recommendedPesticide: 'Copper-based fungicides.',
            recoveryTime: 'Recovery may take 10-14 days.',
            severity: 'Moderate to serious if left untreated.'
        },
        // Add information for other diseases here
    };

    // Check if the predicted disease is in the diseaseInfo object
    if (diseasePrediction in diseaseInfo) {
        var info = diseaseInfo[diseasePrediction];
        solutionHTML = `
            <h2><strong style="color:#050ce1;">${info.name}</strong></h2>
            <p><strong style="color: black;">Description:</strong> ${info.description}</p>
            <p><strong style="color: black;">Precautionary Measures:</strong> ${info.precautionaryMeasures}</p>
            <p><strong style="color: black;">Suggestion:</strong> ${info.suggestion}</p>
            <p><strong style="color: black;">Recommended Pesticide:</strong> ${info.recommendedPesticide}</p>
            <p><strong style="color: black;">Recovery Time:</strong> ${info.recoveryTime}</p>
            <p><strong style="color: black;">Severity:</strong> ${info.severity}</p>
        `;
    } else {
        // Display a default message if the predicted disease is not found in the diseaseInfo object
        solutionHTML = '<p>No detailed information available for this disease.</p>';
    }

    // Display the solution
    resultElement.innerHTML = solutionHTML;

    // Hide the Explore Solutions button
    var exploreButton = document.getElementById('exploreButton');
    exploreButton.style.display = 'none';
}
