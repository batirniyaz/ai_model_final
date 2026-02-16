import tensorflow as tf
import os
import cv2
import numpy as np


project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
cnn_model_path = os.path.join(project_root, 'cnn_model', 'best_model_v2.h5')

model = tf.keras.models.load_model(cnn_model_path)

input_shape = (124, 124)
categories = ['uninfected', 'infected']


def prepare_image(image):
    resized = cv2.resize(image, input_shape, interpolation=cv2.INTER_AREA)
    img_result = np.expand_dims(resized, axis=0)
    img_result = img_result / 255.0
    return img_result


def predict(image_path):
    image = cv2.imread(image_path)
    image_prepared = prepare_image(image)
    prediction = model.predict(image_prepared, verbose=1)
    print(prediction)
    if prediction > 0.5:
        prediction = 1
    else:
        prediction = 0
    print(prediction)
    text = categories[prediction]
    return prediction, text
