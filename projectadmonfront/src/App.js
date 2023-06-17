import './App.css';
// import XMLParser from 'react-xml-parser';

function App() {
  const apiRoute = "http://localhost:8080/";

  const loadfile = () => {
    var file = document.getElementById("file").files[0];
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (evt) {
      var fileString = evt.target.result;
      var fileArray = fileString.split("\n");
      var pipe = document.getElementById("pipe").value;
      var privateKey = document.getElementById("privateKey").value;
      var typeDoc = document.getElementById("typeDoc").value;
      var formattedFileArray = fileArray
        .map((line) => line.trim()) // Trim each line
        .filter((line) => line !== ""); // Exclude empty lines

      var body = {
        pipe: pipe,
        privateKey: privateKey,
        typeDoc: typeDoc,
        file: formattedFileArray,
      };

      fetch(apiRoute + "loadfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((data) => {
          document.getElementById("response").innerHTML = JSON.stringify(
            data
          );
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
    reader.onerror = function (evt) {
      document.getElementById("response").innerHTML = "Error reading file";
    };
  };

  const formatXMLString = (xmlString) => {
    // Remove line breaks, spaces, and \r\n from the XML string
    return xmlString.replace(/\r?\n|\r|\s/g, '');
  };

  const loadDoc = () => {
    const fileInput = document.getElementById('docFile');
    const file = fileInput.files[0];
    const reader = new FileReader();

    if (!(file instanceof Blob)) {
      console.error('Invalid file type');
      return;
    }

    reader.onload = function (event) {
      const fileContent = event.target.result;

      const pipe = document.getElementById('docPipe').value;
      const privateKey = document.getElementById('docPrivateKey').value;
      const typeDoc = document.getElementById('docTypeDoc').value;

      let body;
      if (typeDoc === 'JSON') {
        const jsonData = JSON.parse(fileContent);
        body = {
          pipe: pipe,
          privateKey: privateKey,
          typeDoc: typeDoc,
          xmlFile: null,
          jsonFile: jsonData,
        };
      } else if (typeDoc === 'XML') {
        const xmlString = formatXMLString(fileContent); // Format the XML string
        body = {
          pipe: pipe,
          privateKey: privateKey,
          typeDoc: typeDoc,
          xmlFile: xmlString,
          jsonFile: null,
        };
      } else {
        console.error('Invalid document type');
        return;
      }

      fetch(apiRoute + 'loadDoc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((data) => {
          document.getElementById('response').innerHTML = JSON.stringify(data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };

    reader.onerror = function (event) {
      console.error('Error reading file:', event.target.error);
    };

    reader.readAsText(file, 'UTF-8');
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Project Admon Front</h1>
        <div>
          <h2>Load File</h2>
          <div>
            <label htmlFor="pipe">Pipe</label>
            <input type="text" id="pipe" name="pipe" />
          </div>
          <div>
            <label htmlFor="privateKey">Private Key</label>
            <input type="text" id="privateKey" name="privateKey" />
          </div>
          <div>
            <label htmlFor="typeDoc">Type Doc</label>
            <select id="typeDoc" name="typeDoc">
              <option value="JSON">JSON</option>
              <option value="XML">XML</option>
            </select>
          </div>
          <div>
            <label htmlFor="file">File</label>
            <input type="file" id="file" name="file" />
          </div>
          <button onClick={loadfile}>Load File</button>
        </div>
        <div>
          <h2>Load Doc</h2>
          <div>
            <label htmlFor="docPipe">Pipe</label>
            <input type="text" id="docPipe" name="docPipe" />
          </div>
          <div>
            <label htmlFor="docPrivateKey">Private Key</label>
            <input type="text" id="docPrivateKey" name="docPrivateKey" />
          </div>
          <div>
            <label htmlFor="docTypeDoc">Type Doc</label>
            <select id="docTypeDoc" name="docTypeDoc">
              <option value="JSON">JSON</option>
              <option value="XML">XML</option>
            </select>
          </div>
          <div>
            <label htmlFor="docFile">File</label>
            <input type="file" id="docFile" name="docFile" />
          </div>
          <button onClick={loadDoc}>Load Doc</button>
        </div>
        <div>
          <h2>Response</h2>
          <div id="response"></div>
        </div>
      </header>
    </div>
  );
}

export default App;
