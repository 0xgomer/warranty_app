import excelToJson from "convert-excel-to-json";
import * as fs from "fs";
import ApiError from "../exceptions/api-error.js";

function unique(arr) {
    const countItems = {}

    for (const item of arr) {
        countItems[item] = countItems[item] ? countItems[item] + 1 : 1;
    }

    const result = Object.keys(countItems).filter((item) => countItems[item] > 1);

    return result
}

export const getJsonFromXlsx = async (file) => {

    const json = await excelToJson({
        sourceFile: file.path,
        sheets:[{
            name: 'sheet1',
            columnToKey: {
                D: 'id'
            }
        }],
        header: {
            rows: 1,
            columnToKey: {
                '*': '{{columnHeader}}',
            }
        }
    })

    const result = await json.sheet1.map(item => Object.values(item)[0])

    await fs.unlink(file.path, (err) => {
        if (err) {
            throw ApiError.InternalServerError()
        }
    })

    if (result.length < 1) {
        throw ApiError.BadRequestError(400,"Serial numbers not found in document")
    }

    const equals = unique(result)

    if (equals.length){
        throw ApiError.BadRequestError(400,`Not unique: ${equals}`)
    }

    return result
}