import type ICitizen from "@/types/citizen";

function cityDistStreet(data:ICitizen[]) {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const groupedData: any = {};

    for (const entry of data) {
      const cityName = entry.groups.city;
      const districtName = entry.groups.district;
      const streetName = entry.groups.street;
      const citizenName = entry.name;

      if (!groupedData[cityName]) {
        groupedData[cityName] = {};
      }

      if (!groupedData[cityName][districtName]) {
        groupedData[cityName][districtName] = {};
      }

      if (!groupedData[cityName][districtName][streetName]) {
        groupedData[cityName][districtName][streetName] = [];
      }

      groupedData[cityName][districtName][streetName].push(citizenName);
    }

    return groupedData

}

function coutryCityDistStrHouse(data:ICitizen[]){
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const groupedData: any = {};

    for (const entry of data) {
      const countryName = entry.groups.country;
      const cityName = entry.groups.city;
      const districtName = entry.groups.district;
      const streetName = entry.groups.street;
      const houseName = entry.groups.house;
      const citizenName = entry.name;

      if (!groupedData[countryName]) {
        groupedData[countryName] = {};
      }

      if (!groupedData[countryName][cityName]) {
        groupedData[countryName][cityName] = {};
      }

      if (!groupedData[countryName][cityName][districtName]) {
        groupedData[countryName][cityName][districtName] = {};
      }

      if (!groupedData[countryName][cityName][districtName][streetName]) {
        groupedData[countryName][cityName][districtName][streetName] = {};
      }

      if (!groupedData[countryName][cityName][districtName][streetName][houseName]) {
        groupedData[countryName][cityName][districtName][streetName][houseName] = [];
      }

      groupedData[countryName][cityName][districtName][streetName][houseName].push(citizenName);
    }

    return groupedData
}

function cityStreet(data:ICitizen[]) {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const groupedData: any = {};

    for (const entry of data) {
      const cityName = entry.groups.city;
      const streetName = entry.groups.street;
      const citizenName = entry.name;

      if (!groupedData[cityName]) {
        groupedData[cityName] = {};
      }

      if (!groupedData[cityName][streetName]) {
        groupedData[cityName][streetName] = [];
      }

      groupedData[cityName][streetName].push(citizenName);
    }

    return groupedData

}


export default {cityDistStreet, coutryCityDistStrHouse, cityStreet}
