import express from 'express'
import { PrismaClient} from '@prisma/client'
import { converteHorasEmMinutos } from './utils/convert-hour-string-to-minutes'
import { converteMinutosEmHoras } from './utils/convert-minutes-to-hours-string'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors({
   // origin: (dominio da aplicação. exemplo: localhost:3333)
}))

const prisma = new PrismaClient({
    log: ['query']
})

/*
* QUERY:
* ROUTE:
* BODY:

localhost:3333/ads/5

// HTTP methods / API RESTful / HTTP Codes

// GET, POST, PUT, PATCH, DELETE

// localhost:3333/ads

*/

app.get('/games', async (request, response) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true,
                }
            }
        }
    })

    return response.json(games);
});

app.post('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id;
    const body: any = request.body;

    

    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            hourStart: converteHorasEmMinutos(body.hourStart),
            hourEnd: converteHorasEmMinutos(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel,
    
        }
    })

    return response.status(201).json(ad);
});

app.get('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id;

    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true,
        },
        where: {
            gameId,
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return response.json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: converteMinutosEmHoras(ad.hourStart),
            hourEnd: converteMinutosEmHoras(ad.hourEnd)

        }
    }))
})

app.get('/ads/:id/discord', async (request, response) => {
    const adId = request.params.id;

    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true
        },
        where: {
            id: adId,
        }
    })

    return response.json({
        discord: ad.discord,
    })
})

app.listen(3333)


/*
interface Ad {
    id: string;
    name: string;
    createAt: Date;
}

function cacularQuantoTempoOAnuncioFoiPublicado(ad: Ad){
    
}

cacularQuantoTempoOAnuncioFoiPublicado({
    id: '1',
    name: 'Ad 01',
    createAt: new Date(),
})
*/

