export interface Post {
    id: string // object Id of that post
    askedBy: any //userId is the person's Name who asked the question
    askedOn: Date
    title: string //title of the post
    domain: string
    category: string
    subCategory: string
    answeredBy: Array<string>// who answered the question / by which master
    rating: any // rating of the answer
    sections: any //data of the question ansked
    active: Boolean
    totalAnswers: Number
    totalRating: Number
    unratedAnswers: Number
    carData: object
    ratedBy: any
}