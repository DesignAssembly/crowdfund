
document.addEventListener('DOMContentLoaded', () => {

    // Add Header background on scroll

    window.addEventListener('scroll', ()=> {
        const header = document.querySelector('.header');

        let top = window.scrollY;

        if(top >= 100) {
            header.classList.add('active');
        } else {
            header.classList.remove('active')
        }
    });

    // Open Mobile Nav

    const navTrigger = document.querySelector('.nav__trigger');
    const nav = document.querySelector('.nav');

    navTrigger.addEventListener('click', (e) => {
        e.preventDefault();
            nav.classList.toggle('active');
    });


    // Pledges Modal Section

    const btns = document.querySelectorAll('[data-modal-target]');
    const closeBtns = document.querySelectorAll('.close-btn');
    const selectPledgeBtns = document.querySelectorAll('[data-select-pledge]');
    const overlay = document.querySelector('.overlay');
    const pledges = document.querySelectorAll('.card-modal');
    const pledgeLabels = document.querySelectorAll('.pledge-label');
    const cardPledgeLabel = document.querySelectorAll('.pledge-amount');

    let  totalBacker = document.querySelector('[data-total-backers]');
    let progressBar = document.querySelector('.progress__indicator');
    let totalPledge = document.querySelector('.pledge-total');

    let bambooStandAmount = 101;
    let blackEditionAmount= 64;
    let totalAmount = 89914;
    let totalPersentage = totalAmount / 1000;
    let totalBackerCount = 5007;
    let pledgeAmount ;

    progressBar.style.width = totalPersentage + "%";
    console.log(totalPersentage);

    // reset pledges when modal closed

    const resetPledges = (x, n) => {
        pledges.forEach(pledge => {
            pledge.classList.remove('selected');
        });
    }

    const addAmount = amount => {
        totalPledge.innerHTML = +totalPledge.innerHTML + +amount;
    }


    // set selected pledge
    
    const selectPledge = (y) => {
        const selectedPledge = y.target.dataset.selectPledge;
        const pledgeCount = y.target.dataset.pledgeCount;
        const thankYouModal = document.getElementById(selectedPledge);

        y.target.closest('.modal').classList.remove('active');
        thankYouModal.classList.add('active');

        if(pledgeCount === 'pledge-25') {
            bambooStandAmount --;
            let stockLevels = document.querySelectorAll('.card__count--bamboo');
            stockLevels.forEach(stocklevel => {
                stocklevel.innerHTML = bambooStandAmount;
            });
        }

        if(pledgeCount === 'pledge-75') {
            blackEditionAmount --;
            let stockLevels = document.querySelectorAll('.card__count--black');
            stockLevels.forEach(stocklevel => {
                stocklevel.innerHTML = blackEditionAmount;
            });
        }

        totalBackerCount ++;
        totalBacker.innerHTML = totalBackerCount.toLocaleString('en');

        // add up input total to Global Total

        let input = document.querySelector('#pledge-25');

        pledgeAmount = input.value / 1000;
 
        // update progress bar value

        totalAmount = parseFloat(totalPersentage) + parseFloat(pledgeAmount);
        progressBar.style.width = totalAmount + "%";
        totalPersentage = totalAmount;
    }

    // open modal
    
    const openModal= (z) => {

        const btnTarget = z.target.dataset.modalTarget;
        const pledgeTarget = z.target.dataset.pledgeTarget;
        const modal = document.getElementById(btnTarget);
        const pledge = document.getElementById(pledgeTarget);

        modal.classList.add('active');
        overlay.classList.add('active');
        pledge.classList.add('selected');
        pledge.querySelector('.card-modal__selected input').checked = "true";
    }

    // close modal

    const closeModal= (x) => {
        resetPledges(x);
        overlay.classList.remove('active');
        x.target.closest('.modal').classList.remove('active');
    }
    
    // event listeners
    
    btns.forEach(btn => {
        btn.addEventListener('click', (z) => {
            z.preventDefault();
            openModal(z);
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', (x) => {
            x.preventDefault();
            closeModal(x);
        });
    });

    selectPledgeBtns.forEach(selectPledgeBtn => {
        selectPledgeBtn.addEventListener('click', (y)=> {

           

            let btnData = y.target.dataset.addPledge;
            let input = document.querySelector("[data-pledge-amount = '" + btnData + "']");
            let defaultValue = +btnData.replace("pledge", "");
            console.log(defaultValue);

            if (input.value >= defaultValue) addAmount(input.value);
            else {

                input.closest('.card-modal').classList.add('error');
                console.log(input.value + " is less than the default of " + defaultValue)
            return
            };

            selectPledge(y);
            
        });
    }); 

    pledgeLabels.forEach(pledgeLabel => {
        pledgeLabel.addEventListener('click', (n)=> {
            resetPledges(n);
            pledgeLabel.closest('.card-modal').classList.add('selected');
        });
    });

    //bookmark

    const bookmark = document.querySelector('.bookmark-text');
    const bookmarkCheck = document.querySelector('#bookmark');

    bookmarkCheck.addEventListener('change', ()=> {
        console.log(this);
        if(bookmarkCheck.checked) {

            
            bookmark.innerHTML = "Bookmarked";
        } else {
            bookmark.innerHTML = "Bookmark";
        }
            
    });
});







