import { prisma } from '../../../lib/prisma'
async function createIdea(formData: FormData){ 'use server'; const topic=String(formData.get('topic')||'').trim(); if(!topic) return; await prisma.idea.create({ data:{ topic, channelId:'seed-channel-1', score:3 } }) }
export default async function Ideas(){ const ideas=await prisma.idea.findMany({ orderBy:{createdAt:'desc'}, take:50 })
  return(<section className='card grid gap-3'>
    <h2 className='text-[color:#d4af37] text-xl font-bold'>Ideas Hub</h2>
    <form action={createIdea} className='flex gap-2'><input name='topic' className='input' placeholder='Add a new idea topic...' /><button className='btn'>Add</button></form>
    <ul className='divide-y divide-neutral-800'>{ideas.map(i=>(<li key={i.id} className='py-3'><div className='font-semibold'>{i.topic}</div><div className='text-xs opacity-70'>score: {i.score ?? '-'} • {new Date(i.createdAt).toLocaleString()}</div></li>))}</ul>
  </section>) }