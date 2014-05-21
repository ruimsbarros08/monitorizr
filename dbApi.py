import sqlite3
from db_location import path
#path = '/srv/openg/www/seleq/monitorizr.sqlite'

def passwordValidation(username, password):
	try:
		connection = sqlite3.connect(path)
		cur = connection.cursor()
		cur.execute('SELECT password FROM users2 WHERE username = ?', (username,))
		info = cur.fetchall()
		connection.close()
		message = {}

		try:
			passwordDB = info[0][0]
		except IndexError:
			message["validationStatus"] = "No such user"
			return message

		if password==passwordDB:
			message["validationStatus"] = "Valid password"
			return message
		else:
			message["validationStatus"] = "Invalid password"
			return message

	except sqlite3.Error as e:
		message["validationStatus"] = e.args[0]
		return message


def updateValues(data2update):
	try:
	    connection = sqlite3.connect(path)
	    cur = connection.cursor()
	    cur.execute('UPDATE users2 SET tmin=?, tmax=?, cost=? WHERE username=?', data2update)
	    connection.commit()
	    connection.close()
	    print "Done"
	except sqlite3.Error as e:
		print "Ups,", e.args[0]

#print passwordValidation("fedfw", "cenas")