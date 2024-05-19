
export function findMostCommonLocation (shootingsArr) {
    const locationCounts = {};

    shootingsArr.forEach(obj => {

        const location = obj.loc_of_occur_desc;

        locationCounts[location] = (locationCounts[location] || 0) + 1;
    });

    let mostCommonLocation;
    let highestCount = 0;

    for (const location in locationCounts) {

        if (locationCounts[location] > highestCount) {
            mostCommonLocation = location;
            highestCount = locationCounts[location];
        }
    }

    return (mostCommonLocation);
  }



export function findMostCommonBoro (shootingsArr) {
    const boroCounts = {};

    shootingsArr.forEach(obj => {

        const boro = obj.boro;

        boroCounts[boro] = (boroCounts[boro] || 0) + 1;
    });

    let mostCommonBoro;
    let highestCount = 0;

    for (const boro in boroCounts) {

        if (boroCounts[boro] > highestCount) {
            mostCommonBoro = boro;
            highestCount = boroCounts[boro];
        }
    }

    return (mostCommonBoro);
  }

  export function militaryToRealTime(militaryTime) {
    const [hours, minutes, seconds] = militaryTime.split(':');
    let period = 'AM';
    let hours12 = parseInt(hours, 10);
    
    if (hours12 >= 12) {
        period = 'PM';
        if (hours12 > 12) {
            hours12 -= 12;
        }
    }

    return `${hours12}:${minutes} ${period}`;
}


  export function findMostCommonTime(objectsArray) {
    const timeCounts = {};

    objectsArray.forEach(obj => {
        const time = obj.occur_time;

        timeCounts[time] = (timeCounts[time] || 0) + 1;
    });

  
    let mostCommonTime;
    let highestCount = 0;

    for (const time in timeCounts) {

        if (timeCounts[time] > highestCount) {

            mostCommonTime = time;
            highestCount = timeCounts[time];
        }
    }


    const realTime = militaryToRealTime(mostCommonTime);

    return realTime;
}
