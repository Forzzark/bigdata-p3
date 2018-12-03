#must have lxml installed
#clean data from suggestions from different forums

from bs4 import BeautifulSoup
import re
from nltk.tokenize import WordPunctTokenizer
import lxml
tok = WordPunctTokenizer()

import pandas as pd

pat1 = r'@[A-Za-z0-9]+'
pat2 = r'https?://[A-Za-z0-9./]+'
combined_patterns = r'|'.join((pat1, pat2))

def clean(tweet):
    #Remove html tags
    clean1 = BeautifulSoup(tweet, 'lxml')
    clean1 = clean1.get_text()
    #Remove https and mentions (@)
    clean2 = re.sub(combined_patterns, '', clean1)

    #remove non-letters
    clean3 = re.sub("[^a-zA-Z]", " ", clean2)

    #lower case
    clean4 = clean3.lower()

    #get all words from string whitespaces
    words = tok.tokenize(clean4)

    #return string of words
    return (" ".join(words)).strip()

tweets = pd.read_json("./data/tweets.json", lines=True)

cleaned_tweets = []

for i in range(0, len(tweets.tweetText)):
    cleaned_tweets.append(clean(tweets.tweetText[i]))

cleaned_tweets_df = pd.DataFrame(cleaned_tweets,columns=['text'])

cleaned_tweets_df.to_csv('./data/cleaned_tweets.csv',encoding='utf-8', index=False)
