from keras.models import load_model
import PIL
import numpy as np
model = load_model('top_model.h5')
score = model.evaluate(testX, testY, verbose=0)
print('Test loss:', score[0])
print('Test accuracy:', score[1])
img_path="sample.jpg"
pil_im =PIL.Image.open(img_path).convert('L')
pil_im=blur_image(pil_im)
org_img = img_to_array(pil_im)
def rev_conv_label(label):
    if label == 0 :
        return 'Lato'
    elif label == 1:
        return 'Raleway'
    elif label == 2 :
        return 'Roboto'
    elif label == 3 :
        return 'Sansation'
    elif label == 4:
        return 'Walkway'
data=[]
data.append(org_img)
data = np.asarray(data, dtype="float") / 255.0
y = np.argmax(model.predict(data),axis=1)
label = rev_conv_label(int(y[0]))

print(label)