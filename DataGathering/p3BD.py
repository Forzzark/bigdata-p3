from pyspark.sql import SQLContext, SparkSession

spark = SparkSession.builder.getOrCreate()


df = spark.read.json('/home/Ferni/BigDataTweets.txt')
df.createOrReplaceTempView('tweets')
spark.sql("select lower(extended_tweet.full_text) as tweetText from tweets where lower(extended_tweet.full_text) != 'null' and (lower(extended_tweet.full_text) like '%flu%' or lower(extended_tweet.full_text) like '%zika%' or lower(extended_tweet.full_text) like '%diarrhea%' or lower(extended_tweet.full_text) like '%ebola%' or lower(extended_tweet.full_text) like '%headache%' or lower(extended_tweet.full_text) like '%measles%')").coalesce(1).write.csv('/home/Ferni/data/p3/TweetsContainingKeywords')