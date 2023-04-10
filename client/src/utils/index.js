//一些工具

//剩余日期工具
export const daysLeft = (deadline) => {
    const difference = new Date(Number(deadline)) - Date.now();
    // console.log(difference);
    // const day = new Date(Number(deadline));
    // console.log(day);
    // console.log(deadline);
    // const difference = deadline - Date.now();
    // console.log(deadline);
    const remainingDays = difference / (1000 * 3600 * 24);

    return remainingDays.toFixed(0);
}

//计算百分比 离目标还有多少钱
export const calculateBarPercentage = (goal, raisedAmount) => {
    const percentage = Math.round((raisedAmount * 100) /goal);
    
    return percentage; 
}

//检查我们添加的是否是图片的url
export const checkIfImage = (url, callback) => {
    const img = new Image();
    img.src = url;

    if(img.complete) callback(true);

    img.onload = () => callback(true);
    img.onerror = () => callback(false);
}