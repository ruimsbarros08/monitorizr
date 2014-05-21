import sqlite3
#from db_location import path
path = '/srv/openg/www/seleq/monitorizr.sqlite'

def getUser(username):
	try:
		connection = sqlite3.connect(path)
		cur = connection.cursor()
		cur.execute('SELECT * FROM users2 WHERE username = ?', (username,))
		info = cur.fetchall()
		connection.close()
		print "Done", info
		return info[0]
	except sqlite3.Error as e:
		print "Ups,", e.args[0]

def getAllUsers():
	try:
		connection = sqlite3.connect(path)
		cur = connection.cursor()
		cur.execute('SELECT * FROM users2')
		info = cur.fetchall()
		connection.close()
		print "Done", info
		return info
	except sqlite3.Error as e:
		print "Ups,", e.args[0]

def insertUser(data2insert):
	try:
	    connection = sqlite3.connect(path)
	    cur = connection.cursor()
	    cur.execute('INSERT INTO users2 (mail, username, password, nome, apelido, tmin, tmax, cost) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', data2insert)
	    connection.commit()
	    connection.close()
	    print "Done"
	except sqlite3.Error as e:
		print "Ups,", e.args[0]

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

def updateAccount(data2update):
	try:
	    connection = sqlite3.connect(path)
	    cur = connection.cursor()
	    cur.execute('UPDATE users2 SET mail=?, username=?, password=?, nome=?, apelido=? WHERE username=?', data2update)
	    connection.commit()
	    connection.close()
	    print "Done"
	except sqlite3.Error as e:
		print "Ups,", e.args[0]


#user = ("ruimsbarros08@gmail.com", "ruibarros", "cenas", "Rui", "Barros", 12.0, 30.0, 0.3)
#updated_values = (15.0, 35.0, 0.2, "ruibarros")
#updated_account = ("ec08169@fe.up.pt", "ec08169", "coisas", "Rui", "Barros", "ruibarros")

#insertUser(user)
#updateValues(updated_values)
#updateAccount(updated_account)
#getUser("ec08169")
#getAllUsers()