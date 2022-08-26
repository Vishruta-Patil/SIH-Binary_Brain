from flask import Flask,request
from flask_cors import CORS, cross_origin
import urllib
import cv2
import numpy as np
import math
# from keras.models import load_model
import PIL
from pyzbar.pyzbar import decode

app = Flask(__name__)
cors = CORS(app)


def wrapPrespective(red_point,green_point,black_point,blue_point,givenimg):
    point_matrix = np.float32([red_point,green_point,black_point, blue_point])
    height,width,_ = givenimg.shape
    point_matrix = np.float32([red_point,green_point,black_point, blue_point])
    converted_red_pixel_value = [0,0]
    converted_green_pixel_value = [width,0]
    converted_black_pixel_value = [0,height]
    converted_blue_pixel_value = [width,height]
    converted_points = np.float32([converted_red_pixel_value,converted_green_pixel_value,converted_black_pixel_value,converted_blue_pixel_value])
    perspective_transform = cv2.getPerspectiveTransform(point_matrix,converted_points)
    givenimg = cv2.warpPerspective(givenimg,perspective_transform,(width,height))
    return givenimg
    

@app.route("/sift",methods=["POST","GET"])
@cross_origin()
def sift():
    if request.method=="POST":
        req = request.json
        img1Url = req["img1"]["url"]
        img2Url = req["img2"]["url"]
        #img1Coord = req["img1"]["coord"]
        #img2Coord = req["img2"]["coord"]
       
        ''''''
        #IMAGE 1
        img1 = urllib.request.urlopen(img1Url)
        temparr = np.asarray(bytearray(img1.read()), dtype=np.uint8)
        img1 = cv2.imdecode(temparr, -1)
        '''
        ##Coord Img 1
        red_point = img1Coord[0]
        green_point = img1Coord[1]
        black_point = img1Coord[2]
        blue_point = img1Coord[3]
        point_matrix = np.float32([red_point,green_point,black_point, blue_point])
        width, height = 250,350
        converted_red_pixel_value = [0,0]
        converted_green_pixel_value = [width,0]
        converted_black_pixel_value = [0,height]
        converted_blue_pixel_value = [width,height]
        converted_points = np.float32([converted_red_pixel_value,converted_green_pixel_value,converted_black_pixel_value,converted_blue_pixel_value])
        perspective_transform = cv2.getPerspectiveTransform(point_matrix,converted_points)
        img_OutputOne = cv2.warpPerspective(img1,perspective_transform,(width,height))
        '''
        #IMAGE 2
        img2 = urllib.request.urlopen(img2Url)
        temparr = np.asarray(bytearray(img2.read()), dtype=np.uint8)
        img2 = cv2.imdecode(temparr, -1)
        '''
        ##Coord Img 1
        red_point = img2Coord[0]
        green_point = img2Coord[1]
        black_point = img2Coord[2]
        blue_point = img2Coord[3]
        point_matrix = np.float32([red_point,green_point,black_point, blue_point])
        width, height = 793,1122
        converted_red_pixel_value = [0,0]
        converted_green_pixel_value = [width,0]
        converted_black_pixel_value = [0,height]
        converted_blue_pixel_value = [width,height]
        converted_points = np.float32([converted_red_pixel_value,converted_green_pixel_value,converted_black_pixel_value,converted_blue_pixel_value])
       
        #print(converted_points)
        #print(point_matrix)
       
        perspective_transform = cv2.getPerspectiveTransform(point_matrix,converted_points)
        img_OutputTwo = cv2.warpPerspective(img2,perspective_transform,(width,height))
       
        #cv2.imshow("frame",img_OutputOne)
        #cv2.imshow("frame1",img_OutputTwo)
        #cv2.waitKey(0)
        '''
       
        ###Apply histogram
       
        R, G, B = cv2.split(img1)
        output1_R = cv2.equalizeHist(R)
        output1_G = cv2.equalizeHist(G)
        output1_B = cv2.equalizeHist(B)

        equ = cv2.merge((output1_R, output1_G, output1_B))
       
        img_OutputOne = equ
        img_OutputTwo = img2

       
       
        #SIFT
        sift = cv2.xfeatures2d.SIFT_create()
        keypoints_1, descriptors_1 = sift.detectAndCompute(img_OutputOne,None)
        keypoints_2, descriptors_2 = sift.detectAndCompute(img_OutputTwo,None)
       
        ##Flann
        index_parms = dict(algorithm=0,tree=5)
        search_parms = dict()
        flann = cv2.FlannBasedMatcher(index_parms,search_parms)
        matches = flann.knnMatch(descriptors_1,descriptors_2,k=2)
        good_points = []
        for m,n in matches:
            if m.distance<0.6*n.distance:
                good_points.append(m)
        key_points_considered = min(len(keypoints_1),len(keypoints_2))
        flann_score = len(good_points)/key_points_considered

        ##Brute
        matches = cv2.BFMatcher().knnMatch(descriptors_1, descriptors_2, k=2)
        good = [[m] for m, n in matches if m.distance < 0.7*n.distance]
        brute_score = len(good)/key_points_considered
        img3 = cv2.drawMatchesKnn(img_OutputOne, keypoints_1, img_OutputTwo, keypoints_2, good, None, matchColor=(0, 255, 0), matchesMask=None, singlePointColor=(255, 0, 0), flags=0)
        print(brute_score)
        #cv2.imshow("frame",img3)
        #cv2.waitKey(0)
       
        #print(img1Url,img2Url,img1Coord,img2Coord)
        return {"Brute":brute_score}

    return {}
@app.route("/dimension",methods=["POST","GET"])
@cross_origin()
def dimension():
    def euclidienDistance(y1,y2,x1,x2):
        temp1 = abs(y2-y1)*abs(y2-y1)
        temp2 = abs(x2-x1)*abs(x2-x1)
        return math.sqrt(temp1+temp2)
    
    if request.method=="POST":
        parameters = cv2.aruco.DetectorParameters_create()
        aruco_dict = cv2.aruco.Dictionary_get(cv2.aruco.DICT_5X5_50)
        req = request.json
        #print(req['imgURL'],req['coOrds'])
    
        img2 = urllib.request.urlopen(req['imgURL'])
        temparr = np.asarray(bytearray(img2.read()), dtype=np.uint8)
        img2 = cv2.imdecode(temparr, -1)
        
        ### Wrap ###
        #red_point = req['coOrds'][0]
        #green_point = req['coOrds'][1]
        #black_point = req['coOrds'][2]
        #blue_point = req['coOrds'][3]
        #print(red_point,green_point,black_point,blue_point,"<<<<<<<")
        #img2 = wrapPrespective(red_point,green_point,black_point,blue_point,img2)
        #cv2.imshow("frame1",img2)
        #cv2.waitKey(5000)
        #cv2.imwrite("filename.jpg", img2)
        
        corners, ids, rejected= cv2.aruco.detectMarkers(img2, aruco_dict, parameters=parameters)
        int_corners = np.int0(corners)
        cv2.polylines(img2, int_corners, True, (0, 255, 0), 5)
        #print(corners)
        #cv2.imshow("frame",img2)
        #cv2.waitKey(0)
        for i in range(len(ids)):
            if ids[i]==10:
                temp = corners[i]
                break
        temp = temp.tolist()[0]
        #print(temp,"<<<<<<<<<")
        #print(temp[2][1])
        x = euclidienDistance(temp[0][0],temp[1][0],temp[0][1],temp[1][1])
        y = euclidienDistance(temp[1][0],temp[2][0],temp[1][1],temp[2][1])
        #print(x,y)
        
        temp3 = req['coOrds']
        #temp3 = [[0,0],[1,0],[0,1],[1,1]]
        #lengthCord = euclidienDistance(temp3[0][0],temp3[1][0],temp3[0][1],temp3[1][1])
        #widthCord = euclidienDistance(temp3[2][0],temp3[3][0],temp3[2][1],temp3[3][1])
        lengthCord = img2.shape[1]
        widthCord = img2.shape[0]
        #print(lengthCord,widthCord)
        length = (lengthCord*3)/x
        
        width = (widthCord*3)/y
        print(length,width)
        return {"length":length,"width":width}
        
@app.route("/fontdetection",methods=["POST","GET"])
@cross_origin()
def fontdetection():
    model = load_model('top_model.h5')
    score = model.evaluate(testX, testY, verbose=0)
    print('Test loss:', score[0])
    print('Test accuracy:', score[1])
    
    img2 = urllib.request.urlopen(req['imgURL'])
    temparr = np.asarray(bytearray(img2.read()), dtype=np.uint8)
    img2 = cv2.imdecode(temparr, -1)
    
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

@app.route("/blurdetection",methods=["POST","GET"])
@cross_origin()
def blurDetection():
    if request.method == "POST":
        def detect_blur_fft(image, size=60, thresh=10, vis=False):
            (h, w) = image.shape
            (cX, cY) = (int(w / 2.0), int(h / 2.0))
            fft = np.fft.fft2(image)
            fftShift = np.fft.fftshift(fft)
            
            fftShift[cY - size:cY + size, cX - size:cX + size] = 0
            fftShift = np.fft.ifftshift(fftShift)
            recon = np.fft.ifft2(fftShift)
            magnitude = 20 * np.log(np.abs(recon))
            mean = np.mean(magnitude)
            return mean
        def blurChecker(img):
            mean = detect_blur_fft(img)
            #print(mean)
            cummulativeMean = 0
            i = 0
            for radius in range(1, 30, 2):
                image = img.copy()
                if radius > 0:
                    i+=1
                    image = cv2.GaussianBlur(image, (radius, radius), 0)
                    mean = detect_blur_fft(image)
                    cummulativeMean+=mean
            return abs((cummulativeMean/i)-mean)
        req = request.json
        
        '''
        #Aruco Original
        img1 = urllib.request.urlopen(req['imgURL1'])
        temparr = np.asarray(bytearray(img1.read()), dtype=np.uint8)
        img1 = cv2.imdecode(temparr, -1)
        img1 = cv2.cvtColor(img1,cv2.COLOR_BGR2GRAY)
        #Image Original
        img2 = urllib.request.urlopen(req['imgURL2'])
        temparr = np.asarray(bytearray(img2.read()), dtype=np.uint8)
        img2 = cv2.imdecode(temparr, -1)
        img2 = cv2.cvtColor(img2,cv2.COLOR_BGR2GRAY)
        #Aruco Duplicate
        img3 = urllib.request.urlopen(req['imgURL3'])
        temparr = np.asarray(bytearray(img3.read()), dtype=np.uint8)
        img3 = cv2.imdecode(temparr, -1)
        img3 = cv2.cvtColor(img3,cv2.COLOR_BGR2GRAY)
        #Image Duplicate
        img4 = urllib.request.urlopen(req['imgURL4'])
        temparr = np.asarray(bytearray(img4.read()), dtype=np.uint8)
        img4 = cv2.imdecode(temparr, -1)
        img4= cv2.cvtColor(img4,cv2.COLOR_BGR2GRAY)
        '''
        
        img1 = urllib.request.urlopen(req['imgURL1'])
        temparr = np.asarray(bytearray(img1.read()), dtype=np.uint8)
        img1 = cv2.imdecode(temparr, -1)
        img1 = cv2.cvtColor(img1,cv2.COLOR_BGR2GRAY)
        
        mean1 = blurChecker(img1)
        mean2 = blurChecker(img2)
        mean3 = blurChecker(img3)
        mean4 = blurChecker(img4)
        print(mean1,mean2,mean3,mean4)

        arucoIncrease = abs((mean1-mean3)/mean3)*100
        imgIncrease = abs((mean2-mean4)/mean4)*100
        return ({"arucoIncrease":arucoIncrease,"imgIncrease":imgIncrease})
    return {}

@app.route("/barcode",methods=["POST","GET"])
@cross_origin()
def barcode():
    #image = cv2.imread('test - Copy.jpg')
    if request.method == "POST":
        img1 = urllib.request.urlopen(request.json['imgURL1']["url"])
        temparr = np.asarray(bytearray(img1.read()), dtype=np.uint8)
        img1 = cv2.imdecode(temparr, -1)
        img1 = cv2.cvtColor(img1,cv2.COLOR_BGR2GRAY)
    
    
        #img = cv2.resize(image , (300,300))

        frame = cv2.flip(img1, 1) # Flip the frame
        gray = frame # Convert to grayscale

        barcodes = decode(gray)    

        print(barcodes)
        for barcode in barcodes:
            # Get barcode coordinates
            (x,y,w,h) = barcode.rect
            # Draw a rectangle around it
            cv2.rectangle(frame, (x,y), (x+w,y+h), (0,0,255), 2)
            # Get the data
            barcodeType = barcode.type
            barcodeData = barcode.data.decode("utf-8")
            # Draw the data over the rectangle
            dataText = f"Data: {barcodeData}"
            dataType = f"Type: {barcodeType}"
            cv2.putText(frame, dataText, (x,y-10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0,0,255), 1)
            cv2.putText(frame, dataType, (x,y-30), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0,0,255), 1)

            # Update lastCode if necessary
            if barcodeData:
                print(barcodeData)
                return {"data":10}
            else:
                return {"data":0}
        return {}

if __name__=="__main__":
    app.run(debug=True)