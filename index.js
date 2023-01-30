navigator.getBattery().then( battery => {
    function updateAllBatteryInfo() {
        updateChargeInfo();
        updateLevelInfo();
        updateChargingInfo();
        updateDischargingInfo();
    }

    updateAllBatteryInfo();

    battery.addEventListener('charchingchange', function(){
        updateChargeInfo();
    })

    function updateChargeInfo(){
        console.log(battery.charging)
        if(battery.charging){
            document.querySelector('.status').innerHTML = 'Заряжается...';
            document.querySelector('.battery-level').classList.add('.battery-animation');
        }else{
            document.querySelector('.status').innerHTML = 'Полностью заряжена';
            document.querySelector('.battery-level').classList.remove('.battery-animation');
        }
    }

    battery.addEventListener('levelchange', updateLevelInfo);
    function updateLevelInfo(){
        console.log(battery.level)
        document.querySelector('.battery-level-digit').inerHTML = battery.level * 100 + '%'
        document.querySelector('.battery-level').style.width = battery.level * 100 + '%'
    };

    battery.addEventListener('chargintimechange', updateChargingInfo);

    function updateChargingInfo(){
        battery.querySelector('.charging-time').inerHTML = battery.chargingTime;
    };

    battery.addEventListener('dischargintimechange', updateDischargingInfo);

    function updateDischargingInfo(){
        let count = 0;
        let hourse = battery.dischargingTime / 60 / 60;
        let minFloat = hourse - parseInt(hourse)

        if(minFloat >= 0.6){
            count += 1;
            minFloat -= 60;
            hourse += count;
            hourse = parseInt(hourse) + minFloat;
        }

        document.querySelector('.discharging-time').inerHTML = hourse;
    }
})