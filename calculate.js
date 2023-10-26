  function init() {
    document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);
    
    // Added
    const gradeBoundaryInputs = document.querySelectorAll('input[type="text"]');
    gradeBoundaryInputs.forEach(input => {
      input.addEventListener('input', handleBoundaryChange);
    });
    
    // Added: Attach an event listener to the "Update" button
    document.getElementById('updateButton').addEventListener('click', handleUpdateClick);
  }

  
  let lowerBoundsChanged = false; // Added a flag to track if lower bounds changed

  
  function handleBoundaryChange() {
    lowerBoundsChanged = true; // Set the flag to true when lower bounds change
  }

  
  // function handleUpdateClick() {
  //   // Get the grades data from the file or other source (you can use your existing logic here)
  //   const fileInput = document.getElementById('fileInput');
  //   if (fileInput.files.length > 0) {
  //     const reader = new FileReader();
  //     reader.onload = function (event) {
  //       const csvData = event.target.result;
  //       const gradesData = parseCSV(csvData);
  //       if (gradesData) {
  //         if (lowerBoundsChanged) {
  //           calculateHistogram(gradesData);
  //           updateStats(gradesData);
  //           lowerBoundsChanged = false; // Reset the flag
  //         } else {
  //           alert('Lower bounds have not changed. Click "Update" to apply changes.');
  //         }
  //       } else {
  //         alert('Invalid CSV data. Please check the file format.');
  //       }
  //     };
  //     reader.readAsText(fileInput.files[0]);
  //   }
  // }

  function handleUpdateClick() {
    // Get the grades data from the file or other source (you can use your existing logic here)
    const fileInput = document.getElementById('fileInput');
    if (fileInput.files.length > 0) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const csvData = event.target.result;
  
        // Parse the CSV data to get gradesData
        const gradesData = parseCSV(csvData);
  
        if (gradesData) {
          const lowerBounds = [
            parseFloat(document.getElementById('maxBound').value),
            parseFloat(document.getElementById('A+Bound').value),
            parseFloat(document.getElementById('ABound').value),
            parseFloat(document.getElementById('A-Bound').value),
            parseFloat(document.getElementById('B+Bound').value),
            parseFloat(document.getElementById('BBound').value),
            parseFloat(document.getElementById('B-Bound').value),
            parseFloat(document.getElementById('C+Bound').value),
            parseFloat(document.getElementById('CBound').value),
            parseFloat(document.getElementById('C-Bound').value),
            parseFloat(document.getElementById('DBound').value),
            parseFloat(document.getElementById('FBound').value),
          ];
  
          let error = false;
          // let last = lowerBounds.length-1
          for (let i = 1; i < lowerBounds.length; i++) {
            if (lowerBounds[i] >= lowerBounds[i - 1]) {
              error = true;
              alert(`Lower bounds error: the bounds should be in descending order from top to bottom`);
              break;
            }
          }
  
          if (!error) {
            calculateHistogram(gradesData);
            updateStats(gradesData);
          }
        } else {
          alert('Invalid CSV data. Please check the file format.');
        }
      };
      reader.readAsText(fileInput.files[0]);
    }
  }  
  
  
  function handleFileSelect(event){
    const reader = new FileReader()
    reader.onload = handleFileLoad;
    reader.readAsText(event.target.files[0])
  }
  
  
  function handleFileLoad(event){
    const csvData = event.target.result;
    const gradesData = parseCSV(csvData);
    if (gradesData) {
      calculateHistogram(gradesData);
      updateStats(gradesData);
    } else {
      alert('Invalid CSV data. Please check the file format.');
    }
  }
  
  
  function parseCSV(csvData) {
    const lines = csvData.split('\n');
    const gradesData = [];
  
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line) {
        const parts = line.split(',');
        if (parts.length === 2) {
          const name = parts[0].trim();  // Extract student name
          const grade = parseFloat(parts[1]);  // Extract grade percentage
          if (!isNaN(grade)) {
            gradesData.push({ name, grade });
          }
        }
      }
    }
  
    return gradesData;
  }
  
  
  function calculateHistogram(gradesData) {
      const histogramTable = document.getElementById('histogramTable');
      histogramTable.innerHTML = '';
  
      const gradeBoundaries = [
          { grade: 'A+', bound: parseFloat(document.getElementById('A+Bound').value) },
          { grade: 'A', bound: parseFloat(document.getElementById('ABound').value) },
          { grade: 'A-', bound: parseFloat(document.getElementById('A-Bound').value) },
          { grade: 'B+', bound: parseFloat(document.getElementById('B+Bound').value) },
          { grade: 'B', bound: parseFloat(document.getElementById('BBound').value) },
          { grade: 'B-', bound: parseFloat(document.getElementById('B-Bound').value) },
          { grade: 'C+', bound: parseFloat(document.getElementById('C+Bound').value) },
          { grade: 'C', bound: parseFloat(document.getElementById('CBound').value) },
          { grade: 'C-', bound: parseFloat(document.getElementById('C-Bound').value) },
          { grade: 'D', bound: parseFloat(document.getElementById('DBound').value) },
          { grade: 'F', bound: parseFloat(document.getElementById('FBound').value) }
      ];

      const maxBound = parseFloat(document.getElementById('maxBound').value);

      const gradeCounts = {};
      for (const boundary of gradeBoundaries) {
          gradeCounts[boundary.grade] = 0;
      }
  
      for (const student of gradesData) {
          for (const boundary of gradeBoundaries) {
              if (student.grade >= boundary.bound && student.grade <= maxBound) {
                  gradeCounts[boundary.grade]++;
                  break;
              }
          }
      }
  
      for (const boundary of gradeBoundaries) {
          const row = document.createElement('tr');
          const gradeCell = document.createElement('td');
          gradeCell.textContent = boundary.grade;
          const histogramCell = document.createElement('td');
        //   histogramCell.textContent = 'O'.repeat(gradeCounts[boundary.grade]);
  
          images = []
          for (let i = 0; i < gradeCounts[boundary.grade]; i++) {
            const image = document.createElement('img');
            image.src = 'blue-square.jpg'; // Set the image source
            image.alt = 'Histogram Bar'; // Set an alt attribute for accessibility
            image.width = 20;
            image.height = 10;
            images.push(image);
          }
          histogramCell.textContent = `(${images.length}) `;
          images.forEach(image => {
            histogramCell.appendChild(image);
          });
  
          row.appendChild(gradeCell);
          row.appendChild(histogramCell);
          histogramTable.appendChild(row);
      }
  }
  
  
  function updateStats(gradesData) {
    const statsTable = document.getElementById('statsTable');
    const maxBound = parseFloat(document.getElementById('maxBound').value); // Get the maxBound value from the input element
    const FBound = parseFloat(document.getElementById('FBound').value);

    // Filter students whose grades are below or equal to maxBound
    const studentsBelowMax = gradesData.filter(student => student.grade <= maxBound && student.grade >= FBound);
  
    let highestStudent = studentsBelowMax.reduce((max, student) => (max === null || student.grade > max.grade) ? student : max, null);
  
    const lowestStudent = studentsBelowMax.reduce((min, student) => (min === null || student.grade < min.grade) ? student : min, null);
  
    const highest = highestStudent ? `${highestStudent.name} (${highestStudent.grade.toFixed(2)}%)` : 'N/A';
    const lowest = `${lowestStudent.name} (${lowestStudent.grade.toFixed(2)}%)`;
  
    const grades = studentsBelowMax.map(student => student.grade);
    const mean = grades.reduce((acc, grade) => acc + grade, 0) / grades.length;
    const sortedGrades = [...grades].sort((a, b) => a - b);
    const middle = Math.floor(sortedGrades.length / 2);
    const median = sortedGrades.length % 2 === 0
      ? (sortedGrades[middle - 1] + sortedGrades[middle]) / 2
      : sortedGrades[middle];
  
    // Update the HTML elements with the calculated statistics
    document.getElementById('highestValue').textContent = highest;
    document.getElementById('lowestValue').textContent = lowest;
    document.getElementById('meanValue').textContent = mean.toFixed(2);
    document.getElementById('medianValue').textContent = median.toFixed(2);
  }
  
  
  init();