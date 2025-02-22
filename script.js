document.addEventListener("DOMContentLoaded",function() {

    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
    const cardStatsContainer = document.querySelector(".stats-cards");

    function cardpop(num,cardText)
    {
        let card = document.createElement(`${cardText}`);

        card.classList.add("card");

        card.innerHTML = `<h3>${cardText}</h3><br><p>${num}</p>`;

        document.getElementById("stats-card").appendChild(card);

    }

    function displayUserData(data)
    {
        const totalEasySolved = data.easySolved;
        const totalEasy = data.totalEasy;
        const totalMediumSolved = data.mediumSolved;
        const totalMedium = data.totalMedium;
        const totalHardSolved = data.hardSolved;
        const totalHard = data.totalHard;
        // console.log(totalEasySolved);
        // console.log(totalEasy);
        // console.log(totalMediumSolved);
        // console.log(totalMedium);
        // console.log(totalHardSolved);
        // console.log(totalHard);

        let percentageEasy = (totalEasySolved/totalEasy)*100;
        let percentageMedium = (totalMediumSolved/totalMedium)*100;
        let percentageHard = (totalHardSolved/totalHard)*100;

        if (statsContainer.style.display === "none" || statsContainer.style.display === "") {
            statsContainer.style.display = "block";
        }

        easyLabel.textContent =totalEasySolved+"/"+totalEasy;
        document.getElementById('circle-easy').style.background= `conic-gradient(#20D9E6 var(--progress-degree,${percentageEasy}%),#545863 0%)`;
        mediumLabel.textContent =totalMediumSolved+"/"+totalMedium;
        document.getElementById('circle-medium').style.background= `conic-gradient(#20D9E6 var(--progress-degree,${percentageMedium}%),#545863 0%)`;
        hardLabel.textContent =totalHardSolved+"/"+totalHard;
        document.getElementById('circle-hard').style.background= `conic-gradient(#20D9E6 var(--progress-degree,${percentageHard}%),#545863 0%)`;


        // Cards
        let acceptenceRate = data.acceptanceRate;
        let nameA="AcceptenceRate";
        let rank = data.ranking;
        let nameR = "Rank";

        cardpop(acceptenceRate,nameA);
        cardpop(rank,nameR);        
    }
    function validateUsername(username)
    {
        if(username.trim() === "")
        {
            alert("Enter a username");
            return false;
        }
        const regex = /^[a-zA-Z0-9][a-zA-Z0-9_-]{2,14}[a-zA-Z0-9]$/;
        
        const isMatching = regex.test(username);
        if(!isMatching)
        {
            alert("Invalid Username");
        }
        return isMatching;

    }

    async function fetchUserDetails(username) {
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`;

        try
        {
            searchButton.textContent = "Searching...";
            searchButton.disabled = true;
            const response = await fetch(url);
            if(!response.ok)
            {
                throw new Error("Unable to fetch data");
            }

            let data = await response.json();
            console.log("Logging data:",data);

            displayUserData(data);
        }

        catch(error)
        {
            statsContainer.innerHTML = `<p>No Data Found</p>`
        }

        finally {
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }

        
    }

    searchButton.addEventListener('click', function() {
        const username = usernameInput.value;

        // console.log(username);
        if(validateUsername(username))
        {
            fetchUserDetails(username);
        }
    })
})