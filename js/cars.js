// Car Configurations
const CAR_CONFIGS = {
    'speed-demon': {speed: 9, armor: 4, boost: 12},
    'tank-master': {speed: 5, armor: 9, boost: 8},
    'balanced-rider': {speed: 7, armor: 7, boost: 10},
    'agile-flash': {speed: 8, armor: 6, boost: 11}
};

function getCarStats(carType) {
    return CAR_CONFIGS[carType] || CAR_CONFIGS['balanced-rider'];
}
