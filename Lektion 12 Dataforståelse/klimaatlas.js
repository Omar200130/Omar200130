var xlsx = require('xlsx');
var utf8 = require('utf8');

var kommuneNr = 1;
var inserts = [];

//
// Finder absolutte mediantemperaturer fra et enkelt regneark,
// for en enkelt årstid (år, vinter, forår, sommer, efterår).
//
// @param [sheet] Input er et kommune-regneark fra DMI Klimaatlas excel workbook.
// @param [cellId] Id på startcelle for værdier.
//
// @return en array med 6 værdier. De 3 første er mediantemperaturen
//          for Mellem CO2-niveau, de resterende for Højt CO2-niveau.
//
function getMedianTemperature(sheet, cellId) {
    var temps = [];
    var cell = xlsx.utils.decode_cell(cellId);

    for (var j = 0; j < 2; j++) {
        for (var i = 0; i < 3; i++) {
            cellId = xlsx.utils.encode_cell(cell);
            if ( sheet[cellId] != null) {
                temps.push(sheet[cellId].w);
            } else {
                temps.push(0.0);
            }
            cell.c += 3;
        }
        cell.c -= 9;
        cell.r += 2;
    }
    return temps;
}

//
// Tilføjer SQL INSERTS statements til vores output liste.
// 
// @param [temperatures] liste af median-temperaturer for en enkelt årstid
// @param [season] ID på årstiden som temperaturene kommer fra 
//
function addTemperatures(temperatures, season) {

    var century = 1;
    var CO2_ID = 1;

    temperatures.forEach(elem => {
        inserts.push(`INSERT INTO public."Temperatur" ("temp", "aarstid_id", "aarhundrede_id", "co2_id", "by_id") VALUES (${elem}, ${season}, ${century}, ${CO2_ID}, ${kommuneNr});`);
        century++;
        if (century > 3) {
            century = 1;
            CO2_ID = 2;
        }
    });
    
}

//
// Itererer igennem samtlige regne-ark i excel workbook og
// fisker data ud, som tilføjes til en liste af SQL statements.
//
function processSheet(sheet, kommuneNavn) {

    // console.log("Processere %o ...", kommuneNavn);

    inserts.push(`INSERT INTO public."By" VALUES (${kommuneNr}, '${kommuneNavn}');`);

    // Årstemperaturer
    addTemperatures(getMedianTemperature(sheet, 'F88'), 1);
    // Vintertemperaturer
    addTemperatures(getMedianTemperature(sheet, 'P88'), 2);
    // Forårstemperaturer
    addTemperatures(getMedianTemperature(sheet, 'Z88'), 3);
    // Sommertemperaturer
    addTemperatures(getMedianTemperature(sheet, 'AJ88'), 4);
    // Efterårstemperaturer
    addTemperatures(getMedianTemperature(sheet, 'AT88'), 5);

    kommuneNr++;
}


// Sti og fil navn på DMI's klimaatlas data-fil.
const inFile = `${__dirname}/DMI_Klimaatlas_Alle_kommuner_v2020b.xlsx`

console.log("-------------------------------");
console.log("-- Klimaatlas data ");
console.log("-------------------------------");

const wb = xlsx.readFile(inFile);
var sheets = wb.SheetNames; 
sheets.shift();
sheets.forEach(name => processSheet(name, wb.Sheets[name]))
inserts.forEach(elem => console.log(elem));

console.log("-- Slut  ---------------------")