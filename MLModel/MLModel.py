
import pandas as pd
import tensorflow as tf
from tensorflow import keras

import numpy as np
from keras.utils import to_categorical


#create dictionary
dict = {}
trainingData = pd.read_csv('./data/trainingData.csv', header=None, names=['text', 'sentiment'])
testData =  pd.read_csv('./data/cleaned_tweets.csv')

count = 0

for i in range(0, len(trainingData.text)):
    for word in trainingData.text[i].split(" "):
        if word not in dict:
            dict[word] = count
            count+=1

for i in range(0, len(testData.text)):
    try:
        for word in testData.text[i].split(" "):
            if word not in dict:
                dict[word] = count
                count+=1
    except:
        pass

indexedTrainingData= []
trainingLabels= []
for i in range(0, len(trainingData.text)):
    currTweet = []
    for word in trainingData.text[i].split(" "):
        currTweet.append(dict[word])
    indexedTrainingData.append(currTweet)
    trainingLabels.append(trainingData.sentiment[i])

indexedTestData = []
for i in range(0, len(testData.text)):
    try:
        currTweet = []
        for word in testData.text[i].split(" "):
            currTweet.append(dict[word])
        indexedTestData.append(currTweet)
    except:
        testData.drop(i)


maxLen=0


for data in indexedTrainingData:
    maxLen = max(maxLen, len(data))
for data in indexedTestData:
    maxLen = max(maxLen, len(data))

train_data = keras.preprocessing.sequence.pad_sequences(indexedTrainingData,
                                                        maxlen=maxLen)
test_data = keras.preprocessing.sequence.pad_sequences(indexedTestData,
                                                        maxlen=maxLen)

trainingLabels = to_categorical(trainingLabels)

val_data = train_data[:2000]
train_data = train_data[2000:]

val_labels = trainingLabels[:2000]
train_labels = trainingLabels[2000:]
for p in train_labels: print(p)

vocab_size=len(dict)


model = keras.Sequential()
model.add(keras.layers.Embedding(vocab_size, 16))
model.add(keras.layers.GlobalAveragePooling1D())
model.add(keras.layers.Dense(16, activation=tf.nn.relu))
model.add(keras.layers.Dense(3, activation=tf.nn.softmax))

model.compile(optimizer=tf.train.AdamOptimizer(),
              loss='categorical_crossentropy',
              metrics=['accuracy'])


model.fit(np.array(train_data),
                    np.array(train_labels),
                    epochs=40,
                    batch_size=512,
          validation_data=(np.array(val_data), np.array(val_labels)),
                    verbose=1)

# print(textData)
modelResults = model.predict_classes(np.array(test_data))


model2 = keras.Sequential()
model2.add(keras.layers.Flatten())
model2.add(keras.layers.Dense(16, activation=tf.nn.relu))
model2.add(keras.layers.Dense(3, activation=tf.nn.softmax))

model2.compile(optimizer=tf.train.AdamOptimizer(),
              loss='categorical_crossentropy',
              metrics=['accuracy'])


model2.fit(np.array(train_data),
                    np.array(train_labels),
                    epochs=40,
                    batch_size=512,
          validation_data=(np.array(val_data), np.array(val_labels)),
                    verbose=1)

# print(textData)
model2Results = model2.predict_classes(np.array(test_data))


model1ResultsDF = pd.DataFrame(modelResults, columns=["sentiment"])
model1ResultsDF['text'] = testData


model1ResultsDF.to_csv("./data/model1Predictions.csv", index=False)

model2ResultsDF = pd.DataFrame(model2Results, columns=["sentiment"])
model2ResultsDF['text'] = testData


model2ResultsDF.to_csv("./data/model2Predictions.csv", index=False)