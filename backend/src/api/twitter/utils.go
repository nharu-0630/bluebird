package twitter

import "net/http/cookiejar"

func GetHeaders(jar *cookiejar.Jar) {
	cookie := ""
	jar.allCookies()

}