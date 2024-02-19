import mongoose from 'mongoose'

export default async function connectToMongoDb (): Promise<void> {
  try {
    const mongoURI = process.env.MONGO_DB

    if (mongoURI == null) throw Error('Mongo - no connection string were passed')

    await mongoose.connect(mongoURI)

    console.log('Mongo - Connected successfully')
  } catch (e: unknown) {
    console.log('Mongo - No connected')
    throw e
  }
}
