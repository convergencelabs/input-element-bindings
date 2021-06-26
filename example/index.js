//
// Replace this url with the url to your Convergence Server
const BASE_URL = "http://localhost:8080";

const DOMAIN = "convergence/default";

const DOMAIN_URL = `${BASE_URL}/${DOMAIN}`;

Convergence.connectAnonymously(DOMAIN_URL)
    .then((domain) => {
        return domain.models().openAutoCreate({
            collection: "input-binder",
            id: "test2",
            data: () => {
                return {textInput: "Text to collaborate on"};
            }
        });
    })
    .then((model) => {
        const textInput = document.getElementById("textInput");
        textInput.disabled = false;
        const realTimeString = model.elementAt("textInput");
        ConvergenceInputElementBinder.bindTextInput(textInput, realTimeString);
    })
    .catch((error) => {
        console.error(error);
    });
