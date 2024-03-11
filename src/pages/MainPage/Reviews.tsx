import React from "react"
import { ImageTag, ReviewBox, ReviewImage, ReviewItem } from "./styles/ReviewStyle"

const Reviews = () => {
  return (
    <>
      <ReviewBox>
        <ReviewItem>
          <ImageTag>커플여행</ImageTag>
          <ReviewImage
            src="https://images.unsplash.com/photo-1612977423916-8e4bb45b5233?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="제주도바다"
          />
        </ReviewItem>
        <ReviewItem>
          <ReviewImage
            src="https://images.unsplash.com/photo-1579169825453-8d4b4653cc2c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="귤밭"
          />
        </ReviewItem>
        <ReviewItem>
          <ReviewImage
            src="https://images.unsplash.com/photo-1581398644564-c46e97d9418a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="돌하루방"
          />
        </ReviewItem>
        <ReviewItem>
          <ReviewImage
            src="https://images.unsplash.com/photo-1625822458130-2c679681e28b?q=80&w=1285&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="월정리해변"
          />
        </ReviewItem>
      </ReviewBox>
      <ReviewBox>
        <ReviewItem>
          <ReviewImage
            src="https://images.unsplash.com/photo-1612977423916-8e4bb45b5233?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="제주도바다"
          />
        </ReviewItem>
        <ReviewItem>
          <ReviewImage
            src="https://images.unsplash.com/photo-1579169825453-8d4b4653cc2c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="귤밭"
          />
        </ReviewItem>
        <ReviewItem>
          <ReviewImage
            src="https://images.unsplash.com/photo-1581398644564-c46e97d9418a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="돌하루방"
          />
        </ReviewItem>
        <ReviewItem>
          <ReviewImage
            src="https://images.unsplash.com/photo-1625822458130-2c679681e28b?q=80&w=1285&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="월정리해변"
          />
        </ReviewItem>
      </ReviewBox>
    </>
  )
}

export default Reviews
