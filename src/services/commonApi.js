import {ItrApiService} from "@afiplfeed/itr-ui";
import logOut from "./logout";
import { getAppCodeByDefault } from "../helpers/index";
export const getLtrApiCall = (url, payload={})  => {
	return ItrApiService.GET({url: url, appCode: getAppCodeByDefault(url), ...payload})
		.then(response => {
			if (response.message === "Request failed with status code 401")
				logOut();
			return response;
		}).catch(e => {
			if (e.status === 401) {
				logOut()
			}
		})
};

export const getApiCallITR = (url, payload={})  => {
	return ItrApiService.GET({url: url, appCode: getAppCodeByDefault(url), ...payload},)
		.then(response => {
			if (response.message === "Request failed with status code 401")
				logOut();
			return response;
		}).catch(e => {
			if (e.status === 401) {
				logOut()
			}
		})
};
export const getAppInfo = ()  => {
	return ItrApiService.userApp()
		.then(response => {
			if (response.message === "Request failed with status code 401")
				logOut();
			return response;
		}).catch(e => {
			if (e.status === 401) {
				logOut()
			}
		})
};

export const PostApiCallITR = (url, payload={})  => {
	return ItrApiService.POST({url: url, data: payload, appCode: getAppCodeByDefault(url)})
		.then(response => {
			if (response.message === "Request failed with status code 401")
				logOut();
			return response;
		})
		.catch(e => {
			if (e.status === 401) {
				logOut();
			}
		})
}

