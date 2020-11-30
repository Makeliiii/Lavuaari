import fs from 'fs'
import https from 'https'

export const download = (url: string, dest: string) => {
    return new Promise((resolve: any, reject: any) => {
        const file = fs.createWriteStream(dest)
        const request = https.get(url, res => {
            res.pipe(file)
        })
    
        request.on('error', err => {
            file.close()
            reject(err)
        })

        file.on('finish', () => {
            resolve()
        })

        file.on('error', err => {
            file.close()
            reject(err)
        })
    })
}