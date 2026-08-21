/* =====================================================
   MICROSOFT LEARNING HUB
   COMPLETE SCRIPT
===================================================== */


/* =====================================================
   1. LEARNING PATH DATA
===================================================== */

const learningPaths = {

    "Cloud": {

        description:
            "Build your Azure cloud skills from fundamentals to advanced architecture.",

        certifications: [

            {
                id: "AZ-900",

                name:
                    "Azure Fundamentals",

                level:
                    "Beginner",

                description:
                    "Learn cloud concepts, core Azure services, and Azure management and governance.",

                prerequisite:
                    null,

                url:
                    "https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/"
            },


            {
                id: "AZ-104",

                name:
                    "Azure Administrator Associate",

                level:
                    "Intermediate",

                description:
                    "Learn how to implement, manage, and monitor Azure resources, identity, networking, storage, and governance.",

                prerequisite:
                    "AZ-900",

                url:
                    "https://learn.microsoft.com/en-us/credentials/certifications/azure-administrator/"
            },


            {
                id: "AZ-305",

                name:
                    "Azure Solutions Architect Expert",

                level:
                    "Advanced",

                description:
                    "Learn how to design Azure infrastructure, data, identity, governance, monitoring, and business continuity solutions.",

                prerequisite:
                    "AZ-104",

                url:
                    "https://learn.microsoft.com/en-us/credentials/certifications/azure-solutions-architect/"
            }

        ]
    },


    "AI/Data": {

        description:
            "Explore Microsoft data engineering and Azure AI through a beginner-friendly progression.",

        certifications: [

            {
                id: "DP-900",

                name:
                    "Azure Data Fundamentals",

                level:
                    "Beginner",

                description:
                    "Learn core data concepts, relational and non-relational data, and Azure data services.",

                prerequisite:
                    null,

                url:
                    "https://learn.microsoft.com/en-us/credentials/certifications/azure-data-fundamentals/"
            },


            {
                id: "DP-700",

                name:
                    "Fabric Data Engineer Associate",

                level:
                    "Intermediate",

                description:
                    "Learn how to build and manage data engineering solutions using Microsoft Fabric.",

                prerequisite:
                    "DP-900",

                url:
                    "https://learn.microsoft.com/en-us/credentials/certifications/fabric-data-engineer/"
            },


            {
                id: "AI-901",

                name:
                    "Azure AI Fundamentals",

                level:
                    "Beginner",

                description:
                    "Learn fundamental AI concepts and how AI solutions can be implemented using Microsoft technologies.",

                prerequisite:
                    "DP-900",

                url:
                    "https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-fundamentals/"
            }

        ]
    },


    "Security": {

        description:
            "Build security knowledge from fundamentals to security operations and architecture.",

        certifications: [

            {
                id: "SC-900",

                name:
                    "Security, Compliance, and Identity Fundamentals",

                level:
                    "Beginner",

                description:
                    "Learn foundational concepts in security, compliance, identity, Microsoft Entra, and Microsoft security solutions.",

                prerequisite:
                    null,

                url:
                    "https://learn.microsoft.com/en-us/credentials/certifications/security-compliance-and-identity-fundamentals/"
            },


            {
                id: "SC-200",

                name:
                    "Security Operations Analyst Associate",

                level:
                    "Intermediate",

                description:
                    "Learn how to investigate, respond to, and hunt security threats using Microsoft security solutions.",

                prerequisite:
                    "SC-900",

                url:
                    "https://learn.microsoft.com/en-us/credentials/certifications/security-operations-analyst/"
            },


            {
                id: "SC-100",

                name:
                    "Cybersecurity Architect Expert",

                level:
                    "Advanced",

                description:
                    "Learn how to design cybersecurity strategies covering identity, security operations, infrastructure, applications, and data.",

                prerequisite:
                    "SC-200",

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
   3. LOAD PROGRESS
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



/* Make sure old progress doesn't break new version */

if (!progress.Cloud) {
    progress.Cloud = [];
}

if (!progress["AI/Data"]) {
    progress["AI/Data"] = [];
}

if (!progress.Security) {
    progress.Security = [];
}



/* =====================================================
   4. SELECT DOMAIN
===================================================== */

function selectDomain(domain) {

    currentDomain = domain;


    document.getElementById(
        "domainSection"
    ).style.display =
        "none";


    document.getElementById(
        "pathSection"
    ).style.display =
        "block";


    document.getElementById(
        "domainTitle"
    ).textContent =
        domain;


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
   5. RENDER CERTIFICATIONS
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


            const isCompleted =
                progress[
                    currentDomain
                ].includes(
                    cert.id
                );


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



            /* STATUS */

            let statusText;

            let statusClass;


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



            /* START LEARNING */

            const startLearningButton = `

                <a

                    href="${cert.url}"

                    target="_blank"

                    rel="noopener noreferrer"

                    class="start-learning-btn">

                    📚 Start Learning ↗

                </a>

            `;



            /* COMPLETE BUTTON */

            let completeButton;


            if (isAvailable) {

                completeButton = `

                    <button

                        class="complete-btn"

                        onclick=
                        "completeCertification('${cert.id}')">

                        Mark as Completed

                    </button>

                `;

            }

            else if (isCompleted) {

                completeButton = `

                    <button

                        class="complete-btn"

                        disabled>

                        Completed ✓

                    </button>

                `;

            }

            else {

                completeButton = `

                    <button

                        class="complete-btn"

                        disabled>

                        Locked

                    </button>

                `;

            }



            /* CARD */

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

                    ${completeButton}

                </div>

            `;


            container.appendChild(
                card
            );



            /* CONNECTOR */

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
   6. COMPLETE CERTIFICATION
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



    /* CHECK PREREQUISITE */

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



    /* COMPLETE */

    progress[
        currentDomain
    ].push(certId);


    saveProgress();


    updateLearningStreak();


    renderPath();


    updateDashboard();



    /* NEXT CERT */

    const nextCert =
        getNextAvailable();


    if (nextCert) {

        showAILoading();


        askGemini(
            cert,
            nextCert
        );

    }

    else {

        showCompletionMessage();

    }

}



/* =====================================================
   7. NEXT AVAILABLE
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
   8. AI LOADING
===================================================== */

function showAILoading() {

    document.getElementById(
        "aiMessage"
    ).innerHTML =

        "🤖 AI is preparing your next-step explanation...";

}



/* =====================================================
   9. GEMINI
===================================================== */

async function askGemini(
    completedCert,
    nextCert
) {

    try {

        const response =
            await fetch(
                "/api/explain",
                {

                    method:
                        "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify({

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
                "No explanation received."
            );

        }


        document.getElementById(
            "aiMessage"
        ).innerHTML =

            `🤖 <strong>
            AI Learning Guide:
            </strong>
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

            `💡 <strong>
            Next step:
            </strong>
            ${nextCert.id} —
            ${nextCert.name}
            builds naturally on what
            you've just completed. 🚀`;

    }

}



/* =====================================================
   10. PROGRESS BAR
===================================================== */

function updateProgress() {

    if (!currentDomain) {
        return;
    }


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


    const progressText =
        document.getElementById(
            "progressText"
        );


    const progressFill =
        document.getElementById(
            "progressFill"
        );


    if (progressText) {

        progressText.textContent =
            percentage + "%";

    }


    if (progressFill) {

        progressFill.style.width =
            percentage + "%";

    }

}



/* =====================================================
   11. SAVE
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
   12. STREAK
===================================================== */

function updateLearningStreak() {

    const today =
        new Date().toDateString();


    const lastDate =
        localStorage.getItem(
            "lastLearningDate"
        );


    let streak =
        Number(
            localStorage.getItem(
                "learningStreak"
            )
        ) || 0;


    if (
        lastDate === today
    ) {

        return;

    }


    if (lastDate) {

        const difference =
            Math.floor(

                (
                    new Date(today) -
                    new Date(lastDate)

                ) /

                (
                    1000 *
                    60 *
                    60 *
                    24
                )

            );


        if (
            difference === 1
        ) {

            streak++;

        }

        else {

            streak = 1;

        }

    }

    else {

        streak = 1;

    }


    localStorage.setItem(
        "learningStreak",
        streak
    );


    localStorage.setItem(
        "lastLearningDate",
        today
    );

}



/* =====================================================
   13. ACHIEVEMENTS
===================================================== */

function getAchievements() {

    const total =
        getTotalProgress();


    const achievements = [];


    if (
        total.completed >= 1
    ) {

        achievements.push(
            "🌟 First Step"
        );

    }


    if (
        total.completed >= 2
    ) {

        achievements.push(
            "🔥 On a Roll"
        );

    }


    Object.keys(
        learningPaths
    ).forEach(
        domain => {

            const completed =
                progress[
                    domain
                ].length;


            const total =
                learningPaths[
                    domain
                ].certifications.length;


            if (
                completed === total
            ) {

                if (
                    domain === "Cloud"
                ) {

                    achievements.push(
                        "☁️ Cloud Explorer"
                    );

                }


                if (
                    domain === "AI/Data"
                ) {

                    achievements.push(
                        "🤖 AI/Data Explorer"
                    );

                }


                if (
                    domain === "Security"
                ) {

                    achievements.push(
                        "🛡️ Security Explorer"
                    );

                }

            }

        }
    );


    if (
        total.completed ===
        total.total
    ) {

        achievements.push(
            "🏆 Learning Path Master"
        );

    }


    return achievements;

}



/* =====================================================
   14. TOTAL PROGRESS
===================================================== */

function getTotalProgress() {

    let completed = 0;

    let total = 0;


    Object.keys(
        learningPaths
    ).forEach(
        domain => {

            total +=
                learningPaths[
                    domain
                ].certifications.length;


            completed +=
                progress[
                    domain
                ].length;

        }
    );


    return {
        completed,
        total
    };

}



/* =====================================================
   15. DASHBOARD
===================================================== */

function updateDashboard() {

    const dashboard =
        document.getElementById(
            "progressDashboard"
        );


    if (!dashboard) {

        return;

    }


    let output = `

        <div class="dashboard-box">

            <div class="dashboard-title">

                📊 YOUR PROGRESS

            </div>

    `;



    /* DOMAIN PROGRESS */

    Object.keys(
        learningPaths
    ).forEach(
        domain => {

            const total =
                learningPaths[
                    domain
                ].certifications.length;


            const completed =
                progress[
                    domain
                ].length;


            const percentage =
                Math.round(
                    (
                        completed /
                        total
                    ) * 100
                );


            const totalBlocks = 14;


            const filledBlocks =
                Math.round(
                    (
                        percentage /
                        100
                    ) *
                    totalBlocks
                );


            const emptyBlocks =
                totalBlocks -
                filledBlocks;


            const progressBar =
                "█".repeat(
                    filledBlocks
                ) +
                "░".repeat(
                    emptyBlocks
                );


            let emoji =
                "📚";


            if (
                domain === "Cloud"
            ) {

                emoji =
                    "☁️";

            }

            else if (
                domain === "AI/Data"
            ) {

                emoji =
                    "🤖";

            }

            else if (
                domain === "Security"
            ) {

                emoji =
                    "🛡️";

            }


            output += `

                <div
                    class="dashboard-domain">

                    <div
                        class="dashboard-domain-name">

                        ${emoji}
                        ${domain}

                        <span>
                            ${completed}/${total}
                        </span>

                    </div>


                    <div
                        class="dashboard-bar">

                        ${progressBar}

                    </div>

                </div>

            `;

        }
    );



    /* STREAK */

    const streak =
        Number(
            localStorage.getItem(
                "learningStreak"
            )
        ) || 0;


    output += `

        <div class="dashboard-streak">

            🔥
            ${streak}
            day learning streak

        </div>

    `;



    /* ACHIEVEMENTS */

    const achievements =
        getAchievements();


    output += `

        <div
            class="dashboard-achievements">

            🏆 Achievements

    `;


    if (
        achievements.length === 0
    ) {

        output += `

            <div
                class="no-achievement">

                No achievements yet

            </div>

        `;

    }

    else {

        achievements.forEach(
            achievement => {

                output += `

                    <div
                        class="achievement-item">

                        ${achievement}

                    </div>

                `;

            }
        );

    }


    output += `

        </div>

        </div>

    `;


    dashboard.innerHTML =
        output;

}



/* =====================================================
   16. COMPLETION MESSAGE
===================================================== */

function showCompletionMessage() {

    document.getElementById(
        "aiMessage"
    ).innerHTML = `

        <div
            class="completion-message">

            🎉 <strong>
            PATH COMPLETE!
            </strong>

            <br><br>

            🏆 You've completed the entire
            ${currentDomain}
            learning path!

            <br><br>

            🚀 Amazing work!

        </div>

    `;


    updateDashboard();

}



/* =====================================================
   17. GO HOME
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


    updateDashboard();

}



/* =====================================================
   18. INITIAL STATE
===================================================== */

document.getElementById(
    "pathSection"
).style.display =
    "none";


updateDashboard();