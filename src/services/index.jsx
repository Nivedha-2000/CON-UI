import { ItrApiService } from "@afiplfeed/itr-ui";
// import {getCookies} from "./storage.service";
import { getAppCodeByDefault } from "../helpers/index";

function ApiCall2(options = {}){
    options["headers"] = {...(options["headers"] || {})}
    // if(getCookies("cred") && !options.apiUrl)options["headers"]["Authorization"] = `Bearer ${getCookies("cred")}`
    options.url = options.path;
    options.appCode = options.appCode || getAppCodeByDefault(options.url);

    let errorHandler = err => {
        console.error(err, "error")
    }

    return new Promise((resolve, reject) => {
        ItrApiService[options.method || "GET"](options)
        .then(response => {
            if(!response){
                throw new Error("no response")
            }
            
            let resp = response.data
            if(!Object.keys(resp).length){
                // axiosCall(options).then(r => resolve(r)).catch(e => reject(e))
                reject(response.message || "object empty")
                return
            }
            if(typeof resp.status === "boolean"){
                if(!resp.status)throw new Error(resp.message || "unknown error")
                resolve(resp)
                return
            }
            if(typeof resp.isSuccess === "boolean"){
                if(!resp.isSuccess)throw new Error(resp.message || "unknown error")
                resolve(resp)
                return
            }
            if(!resp.result){
                if (Array.isArray(resp ?? [])) {

                    resolve(resp)

                    return

                }
                throw new Error("Result not found")
            }
            if(!resp.result.status){
                throw new Error(resp.result.message || "unknown error")
            }
            resolve(resp)
        })
        .catch(err => {
            err = (options.responseType || "") === "text" ? err.response.data : err
            errorHandler(err)
            reject(err)
        })
    })
}

function ApiCall(options = {}){
    options["headers"] = {...(options["headers"] || {})}
    // if(getCookies("cred") && !options.apiUrl)options["headers"]["Authorization"] = `Bearer ${getCookies("cred")}`
    options.url = options.path;
    options.appCode = options.appCode || getAppCodeByDefault(options.url);

    let errorHandler = err => {
        console.error(err, "error")
    }

    return new Promise((resolve, reject) => {
        ItrApiService[options.method || "GET"](options)
        .then(response => {
            if(!response){
                throw new Error("no response")
            }
            
            let resp = response
            if(!Object.keys(resp).length){
                reject("object empty")
                return
            }
            if(typeof resp.Success === "boolean"){
                if(!resp.Success)throw new Error(resp.message || "unknown error123")
                resolve(resp)
                return
            }
            resolve(resp)
        })
        .catch(err => {
            err = (options.responseType || "") === "text" ? err.response.data : err
            errorHandler(err)
            reject(err)
        })
    })
}

export default ApiCall