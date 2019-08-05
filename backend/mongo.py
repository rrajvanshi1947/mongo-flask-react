from pymongo import MongoClient

client = MongoClient('localhost', 27017)
mongo = client.aci
if mongo.authenticate('admin', 'admin'):       #DB_USER, DB_PASS, source=DB_SOURCE
    print('Connection to MongoDB established')
else:
    print('Connection to MongoDB FAILED!')

# //aksjfdgiascfas