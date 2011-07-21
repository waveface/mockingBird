import sys
import uuid
import json
from random import randint, choice
import os
from datetime import datetime, timedelta

firstnames = ['Ericka', 'Amie', 'Annabelle', 'Hugh', 'Carmella']
lastnames = ['Hilts', 'Kowalsky', 'Cincotta', 'Gerken', 'Stults']
devicenames = ['iPad', 'Android', 'Web']
filenames = os.listdir('images/original')
basetime = datetime.today()
lipsum='Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sollicitudin elementum tristique. Nullam gravida bibendum magna viverra gravida. Cras nec mi a est malesuada dictum.'

def gen_users(num=10):
    avatars = os.listdir('images/avatars')
    users = []
    for i in range(num):
        user = {}
        user['id'] = uuid.uuid1().hex[:12]
        user['avatar_url'] = 'http://127.0.0.1/images/avatars/%s' % \
                             avatars[randint(0,9)]
        user['email'] = 'a%s@example.com' % randint(0,1000000)
        user['nickname'] = "%s %s" % \
                           (choice(firstnames), \
                           choice(lastnames))
        users.append(user)
    return users

def gen_file(user_id, article_id, timestamp):
    f = {}
    f['id'] = uuid.uuid1().hex[:12]
    f['creator_id'] = user_id
    f['article_id'] = article_id
    f['timestamp'] = timestamp
    f['type'] = 'public.image'
    f['url'] = 'http://127.0.0.1/images/original/%s' % choice(filenames)
    f['thumbnail_url'] = 'http://127.0.0.1/images/thumbnails/%s' % \
                            choice(filenames)
    f['text'] = lipsum
    return f

def gen_comment(users, article_id, timestamp):
    c = {}
    c['id'] = uuid.uuid1().hex[:12]
    c['creator_id'] = choice(users)['id']
    c['creation_device_name'] = choice(devicenames)
    c['article_id'] = article_id
    c['timestamp'] = timestamp
    c['text'] = lipsum
    return c

def gen_articles(users, num=100):
    articles = []
    for i in range(num):
        user = choice(users)
        timestamp = basetime+timedelta(0,i*10)
        article = {}
        article['id'] = uuid.uuid1().hex[:12]
        article['creator_id'] = user['id']
        article['creation_device_name'] = choice(devicenames)
        article['timestamp'] = timestamp.isoformat()
        article['text'] = lipsum
        article['files'] = []
        for j in range(randint(0,5)):
            f = gen_file(user['id'], article['id'], \
                         (timestamp+timedelta(0,j*10)).isoformat())
            article['files'].append(f)

        article['comment_count'] = randint(0,5)
        article['comments'] = []
        for j in range(article['comment_count']):
            c = gen_comment(users, article['id'], \
                            (timestamp+timedelta(0,j*10)).isoformat())
            article['comments'].append(c)

        articles.append(article)
    return articles

if __name__ == '__main__':
    data = {}
    data['users'] = gen_users()
    data['articles'] = gen_articles(data['users'])
    print json.dumps(data, indent=2)
