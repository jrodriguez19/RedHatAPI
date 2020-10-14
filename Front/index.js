async function getServersList() {
    try {
        const response = await fetch('/servers_list', {
            method: 'GET'
        })
        console.log(response.status); // 200
        console.log(response.statusText); // OK
        console.log(response);

        if (response.status == 200) {
            const responseJson = await response.json();
            console.log(responseJson);
            const serversListTable = document.querySelector('#servers_list')

            // let row = serversListTable.insertRow(-1);
            // let cellServerName = row.insertCell(0);
            // let cellUUID = row.insertCell(1);
            // let cellSecurityUpdates = row.insertCell(2);
            // let cellEnhancements = row.insertCell(3);
            // let cellBugFixes = row.insertCell(4);

            // let textServerName = document.createTextNode('SERVER 2 DE PRUEBA');
            // let textUUID = document.createTextNode('987qwerty');
            // let textSecurityUpdates = document.createTextNode('888');
            // let textEnhancements = document.createTextNode('999');
            // let textBugFixes = document.createTextNode('111');

            // cellServerName.appendChild(textServerName);
            // cellUUID.appendChild(textUUID);
            // cellSecurityUpdates.appendChild(textSecurityUpdates);
            // cellEnhancements.appendChild(textEnhancements);
            // cellBugFixes.appendChild(textBugFixes);

            const serversListJson = responseJson.body

            serversListJson.forEach(async element => {
                let row = serversListTable.insertRow(-1);
                let cellServerName = row.insertCell(-1);
                let cellUUID = row.insertCell(-1);
                let cellSecurityUpdates = row.insertCell(-1);
                let cellEnhancements = row.insertCell(-1);
                let cellBugFixes = row.insertCell(-1);

                let textServerName = document.createTextNode(element.name)
                let textUUID = document.createTextNode(element.uuid);

                try {
                    let serverDetails = await getServerDetails(element.uuid);
                    let textSecurityUpdates = 'ERROR';
                    let textEnhancements = 'ERROR';
                    let textBugFixes = 'ERROR';
                    textSecurityUpdates = document.createTextNode(serverDetails.errataApplicabilityCounts.value.securityCount);
                    textEnhancements = document.createTextNode(serverDetails.errataApplicabilityCounts.value.enhancementCount);
                    textBugFixes = document.createTextNode(serverDetails.errataApplicabilityCounts.value.bugfixCount);

                    cellServerName.appendChild(textServerName);
                    cellUUID.appendChild(textUUID);
                    cellSecurityUpdates.appendChild(textSecurityUpdates);
                    cellEnhancements.appendChild(textEnhancements);
                    cellBugFixes.appendChild(textBugFixes);

                }
                catch {
                    err => console.log('Error getting security bugs enhancement count', err);
                }

            });

        }
    }
    catch {
        err => console.log('Fetch Error :-S', err);
    }

}

async function getServerDetails(systemUUID) {
    console.log("Getting SERVER DETAILS FROM CLIENT");
    try {
        const response = await fetch('/server_details?uuid=' + systemUUID, {
            method: 'GET'
        })
        console.log(response.status); // 200
        console.log(response.statusText); // OK
        console.log(response);

        if (response.status == 200) {
            const responseJson = await response.json();
            console.log(responseJson);
            //const pagina = document.querySelector('#serverDetails');
            //pagina.textContent = responseJson.body['complianceStatus'];
            return responseJson.body;
        }
    }
    catch {
        err => console.log('Fetch Error getServerDetails()', err);
    }
}



async function getAdvisories(limit) {
    console.log("Getting SERVER DETAILS FROM CLIENT");
    try {
        const response = await fetch('/errata?limit=' + limit, {
            method: 'GET'
        })
        console.log(response.status); // 200
        console.log(response.statusText); // OK
        console.log(response);

        if (response.status == 200) {
            const responseJson = await response.json();
            console.log('getErrata() bodyresponse is:');
            console.log(responseJson.body);

            //---------------------------------------------------------
            const patchingTable = document.querySelector('#patching-table');
            const advisories = responseJson.body

            advisories.forEach(async element => {

                if (element.type.includes("Important")) {
                    
                    let row = patchingTable.insertRow(-1);

                    let cellSynopsis = row.insertCell(-1);
                    let cellAdvisoryId = row.insertCell(-1);
                    let cellType = row.insertCell(-1);                    
                    let cellAffected = row.insertCell(-1);
                    
                    let textSynopsis = document.createTextNode(element.synopsis.split(" ",2)[1]);
                    let textAdvisoryId = document.createTextNode(element.advisoryId);
                    let textType = document.createTextNode(element.type);
                    
                    let textAffected = document.createTextNode(element.affectedSystemCount);

                    cellSynopsis.appendChild(textSynopsis);
                    cellAdvisoryId.appendChild(textAdvisoryId);
                    cellType.appendChild(textType);
                    
                    cellAffected.appendChild(textAffected);

                }

            });


        }
    }
    catch {
        err => console.log('Fetch Error :-S', err);
    }
}