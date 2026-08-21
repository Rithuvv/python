/* =====================================================
   MICROSOFT LEARNING HUB
   FINAL SCRIPT
   ===================================================== */


/* =====================================================
   1. LEARNING PATH DATASET
   ===================================================== */

const learningPaths = {

    /* =========================
       CLOUD
       ========================= */

    "Cloud": {

        description:
            "Build your Azure cloud skills from fundamentals to advanced architecture.",

        certifications: [

            {
                id: "AZ-900",
                name: "Azure Fundamentals",
                level: "Beginner",

                description:
                    "Learn cloud concepts, core Azure services, and Azure management and governance.",

                prerequisite: null,

                url:
                    "https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/"
            },

            {
                id: "AZ-104",
                name: "Azure Administrator Associate",
                level: "Intermediate",

                description:
                    "Learn how to implement, manage, and monitor Azure resources, identity, networking, storage, and governance.",

                prerequisite: "AZ-900",

                url:
                    "https://learn.microsoft.com/en-us/credentials/certifications/azure-administrator/"
            },

            {
                id: "AZ-305",
                name: "Azure Solutions Architect Expert",
                level: "Advanced",

                description:
                    "Learn how to design Azure infrastructure, data, identity, governance, monitoring, and business continuity solutions.",

                prerequisite: "AZ-104",

                url:
                    "https://learn.microsoft.com/en-us/credentials/certifications/azure-solutions-architect/"
            }

        ]
    },


    /* =========================
       AI / DATA
       ========================= */

    "AI/Data": {

        description:
            "Explore Microsoft data engineering and Azure AI through a beginner-friendly progression.",

        certifications: [

            {
                id: "DP-900",
                name: "Azure Data Fundamentals",
                level: "Beginner",

                description:
                    "Learn core data concepts, relational and non-relational data, and Azure data services.",

                prerequisite: null,

                url:
                    "https://learn.microsoft.com/en-us/credentials/certifications/azure-data-fundamentals/"
            },

            {
                id: "DP-700",
                name: "Fabric Data Engineer Associate",
                level: "Intermediate",

                description:
                    "Learn how to build and manage data engineering solutions using Microsoft Fabric.",

                prerequisite: "DP-900",

                url:
                    "https://learn.microsoft.com/en-us/credentials/certifications/fabric-data-engineer/"
            },

            {
                id: "AI-901",
                name: "Azure AI Fundamentals",
                level: "Beginner",

                description:
                    "Learn fundamental AI concepts and how AI solutions can be implemented using Microsoft technologies.",

                prerequisite: "DP-900",

                url:
                    "https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-fundamentals/"
            }

        ]
    },


    /* =========================
       SECURITY
       ========================= */

    "Security": {

        description:
            "Build security knowledge from fundamentals to security operations and architecture.",

        certifications: [

            {
                id: "SC-900",
                name: "Security, Compliance, and Identity Fundamentals",
                level: "Beginner",

                description:
                    "Learn foundational concepts in security, compliance, identity, Microsoft Entra, and Microsoft security solutions.",

                prerequisite: null,

                url:
                    "https://learn.microsoft.com/en-us/credentials/certifications/security-compliance-and-identity-fundamentals/"
            },

            {
                id: "SC-200",
                name: "Security Operations Analyst Associate",
                level: "Intermediate",

                description:
                    "Learn how to investigate, respond to, and hunt security threats using Microsoft security solutions.",

                prerequisite: "SC-900",

                url:
                    "https://learn.microsoft.com/en-us/credentials/certifications/security-operations-analyst/"
            },

            {
                id: "SC-100",
                name: "Cybersecurity Architect Expert",
                level: "Advanced",

                description:
                    "Learn how to design cybersecurity strategies covering identity, security operations, infrastructure, applications, and data.",

                prerequisite: "SC-200",

                url:
                    "https://learn.microsoft.com/en-us/credentials/certifications/cybersecurity-architect-expert/"
            }

        ]
    }

};



/* =====================================================
   2. CURRENT DOMAIN
   ===================================================== */

let currentDomain = "";



/* =====================================================
   3. USER PROGRESS
   ===================================================== */

let progress =
    JSON.parse(
        localStorage.getItem(
            "microsoftLearningProgress"
        )
    ) || {

        Cloud: [],

        "AI/Data": [],

        Security: []

    };



/* =====================================================
   4. SELECT DOMAIN
   ===================================================== */

function selectDomain(domain) {

    currentDomain = domain;


    document.getElementById(
        "domainSection"
    ).style.display = "none";


    document.getElementById(
        "pathSection"
    ).style.display = "block";


    document.getElementById(
        "domainTitle"
    ).textContent = domain;


    document.getElementById(
        "domainDescription"
    ).textContent =
        learningPaths[domain].description;


    document.getElementById(
        "aiMessage"
    ).textContent =
        "Complete an available step and I'll explain why your next step makes sense.";


    renderPath();

}



/* =====================================================
   5. DISPLAY LEARNING PATH
   ===================================================== */

function renderPath() {

    const container =
        document.getElementById(
            "pathContainer"
        );


    container.innerHTML = "";


    const certifications =
        learningPaths[
            currentDomain
        ].certifications;



    certifications.forEach(
        (cert, index) => {


            /* =========================
               CHECK COMPLETION
               ========================= */

            const isCompleted =
                progress[
                    currentDomain
                ].includes(
                    cert.id
                );


            /* =========================
               CHECK AVAILABILITY
               ========================= */

            let isAvailable = false;


            if (
                cert.prerequisite === null
            ) {

                isAvailable =
                    !isCompleted;

            }

            else {

                const prerequisiteCompleted =
                    progress[
                        currentDomain
                    ].includes(
                        cert.prerequisite
                    );


                isAvailable =
                    prerequisiteCompleted &&
                    !isCompleted;

            }



            /* =========================
               STATUS
               ========================= */

            let statusText = "";

            let statusClass = "";


            if (isCompleted) {

                statusText =
                    "✓ Completed";

                statusClass =
                    "completed";

            }

            else if (isAvailable) {

                statusText =
                    "● Available";

                statusClass =
                    "available";

            }

            else {

                statusText =
                    "🔒 Locked";

                statusClass =
                    "locked";

            }



            /* =========================
               START LEARNING BUTTON
               ========================= */

            const startLearningButton = `

                <a
                    href="${cert.url}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="start-learning-btn">

                    📚 Start Learning ↗

                </a>

            `;



            /* =========================
               COMPLETE BUTTON
               ========================= */

            let buttonHTML = "";


            if (isAvailable) {

                buttonHTML = `

                    <button
                        class="complete-btn"
                        onclick="completeCertification('${cert.id}')">

                        Mark as Completed

                    </button>

                `;

            }

            else if (isCompleted) {

                buttonHTML = `

                    <button
                        class="complete-btn"
                        disabled>

                        Completed ✓

                    </button>

                `;

            }

            else {

                buttonHTML = `

                    <button
                        class="complete-btn"
                        disabled>

                        Locked

                    </button>

                `;

            }



            /* =========================
               CREATE CARD
               ========================= */

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "cert-card";


            card.innerHTML = `

                <div class="cert-left">

                    <div class="step-number">
                        ${index + 1}
                    </div>


                    <div>

                        <h3>
                            ${cert.id}
                            —
                            ${cert.name}
                        </h3>


                        <p>
                            ${cert.description}
                        </p>


                        <span
                            class="status ${statusClass}">

                            ${statusText}

                        </span>

                    </div>

                </div>


                <div class="cert-actions">

                    ${startLearningButton}

                    ${buttonHTML}

                </div>

            `;


            container.appendChild(
                card
            );



            /* =========================
               CONNECTOR
               ========================= */

            if (
                index <
                certifications.length - 1
            ) {

                const connector =
                    document.createElement(
                        "div"
                    );


                connector.className =
                    "connector";


                container.appendChild(
                    connector
                );

            }

        }
    );


    updateProgress();

}



/* =====================================================
   6. MARK CERTIFICATION AS COMPLETED
   ===================================================== */

function completeCertification(certId) {

    const certifications =
        learningPaths[
            currentDomain
        ].certifications;


    const cert =
        certifications.find(
            item =>
                item.id === certId
        );


    if (!cert) {

        return;

    }


    if (
        progress[
            currentDomain
        ].includes(certId)
    ) {

        return;

    }


    /* =========================
       CHECK PREREQUISITE
       ========================= */

    if (
        cert.prerequisite !== null &&
        !progress[
            currentDomain
        ].includes(
            cert.prerequisite
        )
    ) {

        alert(
            "You need to complete the prerequisite first."
        );

        return;

    }


    /* =========================
       MARK COMPLETED
       ========================= */

    progress[
        currentDomain
    ].push(certId);


    saveProgress();


    renderPath();



    /* =========================
       FIND NEXT STEP
       ========================= */

    const nextCert =
        getNextAvailable();



    /* =========================
       AI EXPLANATION
       ========================= */

    if (nextCert) {

        showAILoading();

        askGemini(
            cert,
            nextCert
        );

    }

    else {

        document.getElementById(
            "aiMessage"
        ).innerHTML =
            "🎉 Amazing! You've completed this learning path.";

    }

}



/* =====================================================
   7. FIND NEXT AVAILABLE CERTIFICATION
   ===================================================== */

function getNextAvailable() {

    const certifications =
        learningPaths[
            currentDomain
        ].certifications;


    for (
        const cert of certifications
    ) {

        if (
            progress[
                currentDomain
            ].includes(
                cert.id
            )
        ) {

            continue;

        }


        if (
            cert.prerequisite === null
        ) {

            return cert;

        }


        if (
            progress[
                currentDomain
            ].includes(
                cert.prerequisite
            )
        ) {

            return cert;

        }

    }


    return null;

}



/* =====================================================
   8. AI LOADING MESSAGE
   ===================================================== */

function showAILoading() {

    document.getElementById(
        "aiMessage"
    ).innerHTML =

        "🤖 AI is preparing your next-step explanation...";

}



/* =====================================================
   9. AI EXPLANATION
   ===================================================== */

function showAIExplanation(cert) {

    document.getElementById(
        "aiMessage"
    ).innerHTML =

        `Great progress! <strong>
        ${cert.id} — ${cert.name}
        </strong> is now available.
        This is a logical next step because
        it builds on the skills from your
        previous learning stage.`;

}



async function askGemini(
    completedCert,
    nextCert
) {

    try {

        const response =
            await fetch(
                "/api/explain",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        completedCertification:
                            `${completedCert.id} — ${completedCert.name}`,

                        nextCertification:
                            `${nextCert.id} — ${nextCert.name}`,

                        domain:
                            currentDomain

                    })
                }
            );


        if (!response.ok) {

            throw new Error(
                "Gemini request failed: " +
                response.status
            );

        }


        const data =
            await response.json();


        if (!data.explanation) {

            throw new Error(
                "No explanation received from Gemini."
            );

        }


        document.getElementById(
            "aiMessage"
        ).innerHTML =

            `🤖 <strong>AI Learning Guide:</strong>
            ${data.explanation}`;

    }

    catch (error) {

        console.error(
            "AI Error:",
            error
        );


        document.getElementById(
            "aiMessage"
        ).innerHTML =

            `💡 <strong>Next step:</strong>
            ${nextCert.id} — ${nextCert.name}
            builds naturally on what you've
            just completed. Keep going! 🚀`;

    }

}



/* =====================================================
   10. UPDATE PROGRESS BAR
   ===================================================== */

function updateProgress() {

    const certifications =
        learningPaths[
            currentDomain
        ].certifications;


    const total =
        certifications.length;


    const completed =
        progress[
            currentDomain
        ].length;


    const percentage =
        Math.round(
            (
                completed /
                total
            ) * 100
        );


    document.getElementById(
        "progressText"
    ).textContent =
        percentage + "%";


    document.getElementById(
        "progressFill"
    ).style.width =
        percentage + "%";

}



/* =====================================================
   11. SAVE PROGRESS
   ===================================================== */

function saveProgress() {

    localStorage.setItem(
        "microsoftLearningProgress",

        JSON.stringify(
            progress
        )
    );

}



/* =====================================================
   12. GO BACK HOME
   ===================================================== */

function goHome() {

    document.getElementById(
        "domainSection"
    ).style.display =
        "block";


    document.getElementById(
        "pathSection"
    ).style.display =
        "none";

}



/* =====================================================
   13. INITIAL PAGE STATE
   ===================================================== */

document.getElementById(
    "pathSection"
).style.display =
    "none";