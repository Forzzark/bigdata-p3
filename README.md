# bigdata-p2

Tweets were collected for 3 days, resulting in 50Gb worth of tweets.

From the 50Gbs, 340 tweets contained the specified keywords. These tweets were extracted from the data set using pyspark.

### Frontend
To view visualization go into Frontend folder and www folder. 

Serve index.html with your prefered HTTP Server or use ionic to serve the whole project

### Data Gathering

Files in the Data Processing Folder

- p3BD.py -> spark script used to get the tweets containing the specified tweets from the whole dataset


### ML Model

- tweetCleaner.py -> cleans the tweets' text so that they only contain words (Removes hashtags, mentions, http tags, etc)
                      
- MLModel.py -> creates a dictionary from the words contained in the tweets, so that the tweets can be converted to int vectors.
                Two models are created (described in the frontend), trained, and used to predict the sentiment classification on the data gathered from twitter.
