   
        import {resources} from './ressurser.js'; // importerer variabelen "resources" fra modulenen "ressurser.js", og den blir tilgjengelig for bruk i resten av koden.
    
        const resourcesContainer = document.querySelector(".main-container"); 
        // Det opprettes en konstant variabel som bruker "document.querySelector" for å finne det første HTML-elementet med klassen "main-container" på nettsiden. 
        // Denne variabelen blir brukt til å referere til et container-element for ressurser på siden.
        
        const tabsContainer = document.querySelector(".tabs");
        // Det opprettes en konstant variabel kalt "tabsContainer" som bruker "document.querySelector" for å finne det første HTML-elementet med klassen "tabs" på nettsiden. 
        // Denne variabelen blir brukt til å referere til et container-element for fanene på siden.
        
        function renderTabsAndContent() { // Denne JavaScript-funksjonen, oppretter faner og tilhørende innhold basert på variabelen "resources" fra filen "ressurser.js".
            
            // Iterasjon gjennom ressursene:
            // Funksjonen starter med å iterere gjennom hvert element i arrayet "resources" ved hjelp av "forEach-metoden".
            // For hvert element i resources blir en ny fane opprettet.
            resources.forEach((resource, index) => {
                
                // Opprettelse av faner:
                const tab = document.createElement("li"); // For hver ressurs blir det opprettet en HTML-listeelement (li), som representerer fanen.
                tab.classList.add("tab", `tab${index + 1}`);
                tab.textContent = resource.category; // Fanen får CSS-klasser basert på indeksen til ressursen og blir konfigurert med teksten fra resource.category.
                tab.addEventListener("click", () => openTab(resource.category)); // Det legges til en klikk-lytter som vil kalle en funksjon "openTab" med kategorien til den aktuelle ressursen som parameter.

                //Legg til faner i fanemenyen:
                tabsContainer.appendChild(tab); // Hver fane blir lagt til i fanemenyen, referert som "tabsContainer".
                 
                // Opprettelse av innhold for fanen:
                const tabContent = document.createElement("div"); // For hver ressurs blir det også opprettet et HTML-div-element som representerer innholdet for fanen (tabContent).
                tabContent.id = resource.category.toLowerCase(); // Dette innholdet får en unik ID basert på kategorien til ressursen i små bokstaver.
                tabContent.classList.add("tab-content"); 

                // Legg til innhold i fanen:
                const heading = document.createElement("h2"); // Innholdet for fanen består av en overskrift (h2) med teksten fra resource.category, 
                heading.textContent = `${resource.category}`;
                const paragraph = document.createElement("p"); // en avsnitt (p) med teksten fra resource.text, 
                paragraph.textContent = resource.text;
                const sourcesList = document.createElement("ul"); // og en liste med kilder (sourcesList) basert på elementene i resource.sources.
                
                resource.sources.forEach((source) => { // Her brukes en forEach-løkke til å iterere gjennom en liste av kilder (resource.sources).
                    const listItem = document.createElement("li"); // For hver kilde blir det opprettet et listeelement (<li>). 
                    const link = document.createElement("a"); // For hver kilde blir det opprettet et anker-element (<a>). 
                    link.href = source.url; // Lenken blir konfigurert med URL-en fra kilden (source.url), 
                    link.target = "_blank"; // målet settes til "_blank" for å åpne lenken i et nytt vindu eller en ny fane, 
                    link.textContent = source.title; // teksten for lenken blir satt til tittelen fra kilden (source.title). 
                    listItem.appendChild(link); // lenken blir lagt til som et barn av listeelementet,
                    sourcesList.appendChild(listItem); // listeelementet blir lagt til i en eksisterende liste (som er definert som sourcesList).
                });

                // Legg til innhold i fanen
                tabContent.appendChild(heading); // Overskriften (<h2>) lagt til i innholdet for fanen (tabContent), og teksten for overskriften blir satt til kategorien til ressursen (resource.category).
                tabContent.appendChild(paragraph); // Avsnittet (<p>) blir lagt til i innholdet for fanen (tabContent), og teksten for avsnittet blir satt til teksten fra ressursen (resource.text).
                tabContent.appendChild(sourcesList); // Kildelisten (sourcesList) blir lagt til i innholdet for fanen (tabContent). Denne listen inneholder lenker til ulike kilder knyttet til ressursen

                // Legg til fanen i hovedcontaineren:
                // Til slutt blir fanen med sitt innhold lagt til i en hovedcontainer, som er referert til som resourcesContainer.
                resourcesContainer.appendChild(tabContent);
            });

            // Åpne standardfane ved lasting
            // Til slutt blir det kalt en funksjon openTab med kategorien til den første ressursen, antatt å åpne den som standard når siden lastes.
            // Denne funksjonen ser ut til å være en del av en dynamisk generering av faner og innhold basert på en liste av ressurser, og den tar seg av både opprettelsen og stylingen av HTML-elementene samt tilknytningen av hendelseslyttere.
            openTab(resources[0].category);
        }

        function openTab(tabName) { // Funksjonen åpner faner basert på navnet på fanen.
            const tabContents = document.querySelectorAll(".tab-content"); // Henter alle HTML-elementer med klassen "tab-content" og lagrer dem i variabelen tabContents. 
            const tabs = document.querySelectorAll(".tab"); // Henter alle HTML-elementer med klassen "tab" og lagrer dem i variabelen tabs.

            tabContents.forEach((content) => { // Starter en løkke som går gjennom hvert element i tabContents (alle elementer med klassen "tab-content").
                content.classList.remove("active"); // Fjerner klassen "active" fra gjeldende innholds-element. "active" klassen brukes til å markere den nåværende aktive fanen.
                if (content.id === tabName.toLowerCase()) { // Hvis id-en til det gjeldende innholds-elementet er lik tabName (argumentet som ble gitt til funksjonen), legges klassen "active" tilbake. Dette markerer den valgte fanen som aktiv.
                    content.classList.add("active");
                }
            });

            tabs.forEach((tab) => { // Starter en løkke som går gjennom hvert element i tabs (alle elementer med klassen "tab").
                tab.classList.remove("active"); // Fjerner klassen "active" fra gjeldende faneelement.
                if (tab.textContent === tabName) { // Hvis tekstinnholdet (textContent) til det gjeldende faneelementet er lik tabName, legges klassen "active" tilbake. Dette markerer den valgte fanen som aktiv.
                    tab.classList.add("active");
                }
            });
        }

        renderTabsAndContent(); // Kall funksjonen for å bygge fanemeny og innhold
