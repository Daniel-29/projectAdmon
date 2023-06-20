import "./App.css";
// import XMLParser from 'react-xml-parser';
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";

function App() {
  const apiRoute = "http://localhost:8080/projectAdmon/";
  const fileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result;
      console.log(content);
      document.getElementById('prev').innerHTML = content;
    };

    reader.readAsText(file);
  };
  const fileChangeDoc = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result;
      console.log(content);
      document.getElementById('prevDoc').innerHTML = content;
    };

    reader.readAsText(file);
  };

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
    console.log(formattedFileArray);
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
          data.data
        );

        // Download the response as a file
        const responseFileName = "response";
        const responseContent = JSON.stringify(data.data);
        downloadFile(responseFileName, responseContent, typeDoc);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  reader.onerror = function (evt) {
    document.getElementById("response").innerHTML = "Error reading file";
  };
};

const downloadFile = (fileName, content, fileType) => {
  const element = document.createElement("a");
  const fileExtension = fileType === "JSON" ? ".json" : ".xml";
  const mimeType = fileType === "JSON" ? "application/json" : "application/xml";

  element.setAttribute(
    "href",
    "data:" + mimeType + ";charset=utf-8," + encodeURIComponent(content)
  );
  element.setAttribute("download", fileName + fileExtension);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};


  const formatXMLString = (xmlString) => {
    // Remove line breaks, spaces, and \r\n from the XML string
    return xmlString.replace(/\r?\n|\r|\s/g, "");
  };

  const loadDoc = () => {
    const fileInput = document.getElementById("docFile");
    const file = fileInput.files[0];
    const reader = new FileReader();

    if (!(file instanceof Blob)) {
      console.error("Invalid file type");
      return;
    }

    reader.onload = function (event) {
      const fileContent = event.target.result;

      const pipe = document.getElementById("docPipe").value;
      const privateKey = document.getElementById("docPrivateKey").value;
      const typeDoc = document.getElementById("docTypeDoc").value;

      let body;
      if (typeDoc === "JSON") {
        const jsonData = JSON.parse(fileContent);
        body = {
          pipe: pipe,
          privateKey: privateKey,
          typeDoc: typeDoc,
          xmlFile: null,
          jsonFile: jsonData,
        };
      } else if (typeDoc === "XML") {
        const xmlString = formatXMLString(fileContent); // Format the XML string
        body = {
          pipe: pipe,
          privateKey: privateKey,
          typeDoc: typeDoc,
          xmlFile: xmlString,
          jsonFile: null,
        };
      } else {
        console.error("Invalid document type");
        return;
      }

      fetch(apiRoute + "loadDoc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((data) => {
          document.getElementById("responseDoc").innerHTML = JSON.stringify(
            data.data.file
          );

          // Download the response as a file
          const responseFileName = "response";
          const responseContent = JSON.stringify(data.data.file);
          downloadFileDoc(responseFileName, responseContent, typeDoc);

          
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    reader.onerror = function (event) {
      console.error("Error reading file:", event.target.error);
    };

    reader.readAsText(file, "UTF-8");
  };

  const downloadFileDoc = (fileName, content, fileType) => {
    const element = document.createElement("a");
    // download all types of files to .txt
    const fileExtension = ".txt";
    const mimeType = "text/plain";

    element.setAttribute(
      "href",
      "data:" + mimeType + ";charset=utf-8," + encodeURIComponent(content)
    );

    element.setAttribute("download", fileName + fileExtension);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };


  return (
    <div className="App">
      <header className="App-header">
        <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div
            className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
            aria-hidden="true"
          >
            <div
              className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Convertidor de archivos
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Convierte tus archivos TXT a JSON o XML y viceversa
            </p>
          </div>
          <form
            action="#"
            method="POST"
            className="mx-auto mt-16 max-w-xl sm:mt-20"
          >
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="pipe"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Delimitador
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="pipe"
                    id="pipe"
                    autoComplete="pipe"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="privateKey"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Llave privada
                </label>
                <div className="mt-2.5">
                  <input
                    type="password"
                    name="privateKey"
                    id="privateKey"
                    autoComplete="privateKey"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="typeDoc"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Tipo de archivo a convertir
                </label>
                <div className="mt-2.5">
                  <select
                    id="typeDoc"
                    name="typeDoc"
                    autoComplete="typeDoc"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="JSON">JSON</option>
                    <option value="XML">XML</option>
                  </select>
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Subir archivo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <ArrowUpTrayIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Subir archivo</span>
                        <input
                          id="file"
                          name="file"
                          type="file"
                          className="sr-only"
                          onChange={fileChange}
                          />
                      </label>
                      <p className="pl-1">TXT</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="prev"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Previsualizacion
                </label>
                <div className="mt-2.5">
                  <textarea
                    name="prev"
                    id="prev"
                    rows={16}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="response"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Respuesta
                </label>
                <div className="mt-2.5">
                  <textarea
                    name="response"
                    id="response"
                    rows={16}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
              </div>
            </div>
          </form>
          <div className="mt-10">
            <button
              onClick={loadfile}
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Convertir
            </button>
          </div>
          <button onClick={loadDoc}>Load Doc</button>
        </div>
        <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Convertidor de archivos
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Convierte tus archivos TXT a JSON o XML y viceversa
            </p>
          </div>
          <form
            action="#"
            method="POST"
            className="mx-auto mt-16 max-w-xl sm:mt-20"
          >
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="docPipe"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Delimitador
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="docPipe"
                    id="docPipe"
                    autoComplete="docPipe"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="docPrivateKey"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Llave privada
                </label>
                <div className="mt-2.5">
                  <input
                    type="password"
                    name="docPrivateKey"
                    id="docPrivateKey"
                    autoComplete="docPrivateKey"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="docTypeDoc"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Tipo de archivo a convertir
                </label>
                <div className="mt-2.5">
                  <select
                    id="docTypeDoc"
                    name="docTypeDoc"
                    autoComplete="docTypeDoc"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="JSON">JSON</option>
                    <option value="XML">XML</option>
                  </select>
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Subir archivo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <ArrowUpTrayIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="docFile"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Subir archivo</span>
                        <input
                          id="docFile"
                          name="docFile"
                          type="file"
                          className="sr-only"
                          onChange={fileChangeDoc}
                        />
                      </label>
                      <p className="pl-1">TXT</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="prevDoc"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Previsualizacion
                </label>
                <div className="mt-2.5">
                  <textarea
                    name="prevDoc"
                    id="prevDoc"
                    rows={16}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="responseDoc"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Respuesta
                </label>
                <div className="mt-2.5">
                  <textarea
                    name="responseDoc"
                    id="responseDoc"
                    rows={16}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
              </div>
            </div>
          </form>
          <div className="mt-10">
            <button
              onClick={loadDoc}
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Convertir
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
