import { findMostCommonLocation } from "./genData"

export function grabBronxData (arr) {
    const boroShootingsArr = arr.filter(s => s.boro === "BRONX")

    return {
        boroShootings: boroShootingsArr.length,
        fatalDeaths: boroShootingsArr.filter(s => s.statistical_murder_flag === 'Y').length,
        commonLocation: findMostCommonLocation(boroShootingsArr),
        commonTime: findMostCommonTime(boroShootingsArr)
    }
}
export function grabManhattanData (arr) {
    const boroShootingsArr = arr.filter(s => s.boro === 'MANHATTAN')

    return {
        boroShootings: boroShootingsArr.length,
        fatalDeaths: boroShootingsArr.filter(s => s.statistical_murder_flag === 'Y').length,
        commonLocation: findMostCommonLocation(boroShootingsArr),
        commonTime: findMostCommonTime(boroShootingsArr)
    }
}
export function grabBrooklynData (arr) {
    const boroShootingsArr = arr.filter(s => s.boro === "BROOKLYN")

    return {
        boroShootings: boroShootingsArr.length,
        fatalDeaths: boroShootingsArr.filter(s => s.statistical_murder_flag === 'Y').length,
        commonLocation: findMostCommonLocation(boroShootingsArr),
        commonTime: findMostCommonTime(boroShootingsArr)
    }
}
export function grabQueensData (arr) {
    const boroShootingsArr = arr.filter(s => s.boro === "QUEENS")

    return {
        boroShootings: boroShootingsArr.length,
        fatalDeaths: boroShootingsArr.filter(s => s.statistical_murder_flag === 'Y').length,
        commonLocation: findMostCommonLocation(boroShootingsArr),
        commonTime: findMostCommonTime(boroShootingsArr)
    }
}
export function grabStatenIslandData (arr) {
    const boroShootingsArr = arr.filter(s => s.boro === "STATEN ISLAND")

    return {
        boroShootings: boroShootingsArr.length,
        fatalDeaths: boroShootingsArr.filter(s => s.statistical_murder_flag === 'Y').length,
        commonLocation: findMostCommonLocation(boroShootingsArr),
        commonTime: findMostCommonTime(boroShootingsArr)
    }
}
