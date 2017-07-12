from flask import  Flask, request, jsonify,session, redirect, url_for,g,abort, Response

import json
import cloudDbHandler as dbhelper


#API_KEY = ['NkHb13BxRBiZ0JSyxLbAU','Hx1XU63ZThyFGsqfLeGu7']


app = Flask(__name__)




############################Normal Function To calculate the Detaisl ###################################################

@app.after_request
def after_request(response):
	response.headers['Access-Control-Allow-Origin']='*'
	response.headers['Access-Control-Allow-Headers']='Content-Type, Authorization'
	response.headers['Access-Control-Allow-Methods']= 'GET, PUT, POST, DELETE'
	return response


##########################################Login and Signup Api Calls   ######################################


@app.route('/api/rest/session/',methods=['GET','POST'])
def sessionCreate():
	if request.method == 'POST':
		logindata=json.loads(request.data)
		username=logindata['username']
		userid=logindata['userid']
		session['username']=username
		session['userid']=userid
		session['loged_in']=True
		sessionData={'status': 1, 'userid':userid}

		resp = Response(json.dumps(sessionData))
		return after_request(resp)

@app.route('/api/logout/session/',methods=['GET','POST'])
def sessionLogout():
	if request.method == 'GET':
		
		session['username']=None
		session['userid']=0
		session['loged_in']=None
		sessionData={'logout': 1 }

		return redirect('/')

@app.route('/api/rest/check/status/',methods=['GET','POST'])
def sessionCheck():
	if request.method == 'GET':
		if 'loged_in' in session:
			userid= session['userid']
			sessionData={'status': 1, 'userid':userid}
				
		else:
			sessionData={'status': 0, 'userid':0}

		resp = Response(json.dumps(sessionData))
		return after_request(resp)

@app.route('/api/getlogin/', methods=['GET', 'POST'])
def postAdminUser_estimation():
	if request.method == 'POST':
		userdata = json.loads(request.data)
		username = userdata['username']
		password = userdata['password']

		
		result=dbhelper.GetData().getLoginData(username, password)[0]
		json_results = []
		if len(result)!=0:
			user_id = result[0]
			username= result[1]
			session['username']=username
			session['userid']=user_id
			session['loged_in']=True

			sessionData={'status': 1, 'userid':user_id, 'username':username }
		   
			json_results.append(sessionData)
	  
	
		resp = Response(json.dumps({"success":1, "datasets":json_results}))
		return after_request(resp)


		

app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'
		  
if __name__ == "__main__":
	app.run()
	