var cookiecount = 0;
var GrandmasSpoons = 0;
var GrandmasSpoonsDelta = 1;
var grandmasCount = 0;
var grandmasAreWorking = false;
var grandmaCapper = 0;
var shops = 0;
var money = 0;
// Initial Prices in Shop
var spoonPrice = 50;
var grandmaPrice = 500;
// html elements
var cookieCounter = document.getElementById("cookiecount")
var shopDisplayer = document.getElementById("storecount")
// To control the amount of work that is done, lose grandmas after lots of work
var grandmaTimesWorked = 0;

var deltaGrandmasWork;
var grandmaResigned = 0;
var moneyDelta;
// if you dont have enough money for something in a store
function noMoneyEnough() {
    alert("Insufficient Balance")
}
// Check if there are enough cookies for store
function checkStore() {
    // Counts
    document.getElementById("cookiecount").innerHTML = cookiecount;
    document.getElementById("grandmasSpoonsCount").innerHTML = GrandmasSpoons;
    document.getElementById("grandmasCountDisplay").innerHTML = grandmasCount;
    document.getElementById("storecount").innerHTML = shops;
    document.getElementById("money").innerHTML = money;
    // Spoons
    if (cookiecount >= spoonPrice) {
        document.getElementById("grandmasSpoonsColoring").style.backgroundColor = "green";
    }
    else if (cookiecount < spoonPrice) {
        document.getElementById("grandmasSpoonsColoring").style.backgroundColor = "white";
    }
    // Grandmas
    if (cookiecount >= grandmaPrice) {
        document.getElementById("grandmaColoring").style.backgroundColor = "green";
    }
    else if (cookiecount < grandmaPrice) {
        document.getElementById("grandmaColoring").style.backgroundColor = "white";
    }
    // Shops
    if (cookiecount > 1999) {
        document.getElementById("shopBuy").style.backgroundColor = "green";
    }
    else if (cookiecount < 2000) {
        document.getElementById("shopBuy").style.backgroundColor = "white";
    }
}
checkStore();
// the stuff when you click the cookie
function ClickCookie() {
    cookiecount = cookiecount + 1;
    if (GrandmasSpoons > 0) {
        cookiecount = cookiecount + GrandmasSpoons;
        cookiecount = Math.round(cookiecount);
    }
    document.getElementById("cookiecount").innerHTML = cookiecount;
    checkStore();
// When you buy a spoon
}
function GranmasCookiesClick() {
    if (cookiecount > 49) {
        GrandmasSpoons = GrandmasSpoons + 1;
        GrandmasSpoonsDelta = GrandmasSpoonsDelta + .3;
        cookiecount = cookiecount - 50;
        document.getElementById("cookiecount").innerHTML = cookiecount;
        document.getElementById("grandmasSpoonsCount").innerHTML = GrandmasSpoons;
    }
    else {
        noMoneyEnough();
    }
    checkStore();
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// When you hire a grandma to work
function grandmaIsHired() {
    if (cookiecount > 499) {
        grandmasCount = grandmasCount + 1;
        cookiecount = cookiecount - 500;
        document.getElementById("cookiecount").innerHTML = cookiecount;
        document.getElementById("grandmasCountDisplay").innerHTML = grandmasCount;
        checkStore();
    }
    checkStore();
}

function buyShop() {
    if (cookiecount > 1999) {
        if (shops == 0){
            shops += 1;
            cookiecount -= 2000;
            document.getElementById("storecount").innerHTML = shops;
            document.getElementById("cookiecount").innerHTML = cookiecount;
        }
        else {
            alert("Looks like you already have a store.");
        }
    

    }
    else {
        noMoneyEnough();
    }
    checkStore();
}


// to notify you about missing grandmas
function grandmaResignMessage() {
    if (timesGrandmaResigned < 5) {
        alert('"Looks like my hand fell off from making cookies, I cant do it anymore. See ya around." - Grandma');
    }
    else if (timesGrandmaResigned == 5) {
        alert("By now you should have gotten the catch. After working alot, your grandmas will get tired and thus will stop working.");
    }
    else if (timesGrandmaResigned > 5) {
        console.log("Lost one grandma");
    }
}

function work() {
    // Grandmas Make Cookies
    if (grandmasCount > 0) {
        // Make grandma work
        deltaGrandmasWork = grandmasCount * 24;
        cookiecount += deltaGrandmasWork;
        grandmaTimesWorked += 1;
        checkStore();
        if (grandmaTimesWorked > 23) {
            grandmasCount -= 1;
            grandmaTimesWorked -= 23;
            grandmaResigned += 1;
            if (grandmaResigned < 5) {
                alert('"Looks like my hand fell off from making cookies, I cant do it anymore. See ya around." - Grandma');
                console.log("1");
            }
            else if (grandmaResigned == 5) {
                alert("By now you should have gotten the catch. After working alot, your grandmas will get tired and thus will stop working.");
                connsole.log("2")
            }
            else if (grandmaResigned > 5) {
                console.log("Lost one grandma");
            }
        }
    }
    checkStore(); 
}    
     

    


// Sell your cookies
function sellCookies() {
    if (shops == 1) {
        moneyDelta = cookiecount / 2;
        money += moneyDelta;
        cookiecount = 0;
        checkStore();
    }
    else {
        alert("You don't have a shop to sell your cookies at");
    }
}
