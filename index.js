var dropZone = document.getElementById('drop-zone');

dropZone.addEventListener('dragover', function (e) {
  e.preventDefault();
  dropZone.classList.add('highlight');
});

dropZone.addEventListener('dragleave', function () {
  dropZone.classList.remove('highlight');
});

dropZone.addEventListener('drop', function (e) {
  e.preventDefault();
  dropZone.classList.remove('highlight');

  var files = e.dataTransfer.files;
  handleFiles(files);
});

function handleFiles(files) {
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var reader = new FileReader();

    reader.onload = function (e) {
      var fileContent = e.target.result;
      var editedContent = deleteLines(fileContent);
      downloadFile(editedContent, file.name);
    };

    reader.readAsText(file);
  }
}

function deleteLines(text) {
  var lines = text.split('\n');
  var editedLines = [];

  for (var i = 0; i < lines.length; i++) {
    if ((i + 1) % 2 === 0) { // Check for even indices (odd-numbered lines)
      editedLines.push(lines[i]);
    }
  }

  return editedLines.join('\n');
}

function downloadFile(content, filename) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
