import { BASE_URL } from './common.js';

const urlSearch = new URLSearchParams(location.search);
const page = isNaN(urlSearch.get('page')) ? 1 : urlSearch.get('page');
const id = urlSearch.get('id');

async function getCommunity() {
    const res = await fetch(`${BASE_URL}/community/?page=${page}`)
    if (res.ok) {
        const data = await res.json();
        for (const community of data.results) {
            const card = createCommunityCard(community);
            document.getElementById('community-list').appendChild(card);
        }
        const $pagination = createPagination(data);
        document.querySelector('footer').appendChild($pagination);
        document.getElementById('count').innerText = data.count+' items';
    }

}

function createCommunityCard(community) {
    const card = document.createElement('div');
    card.classList.add('rounded-lg', 'border', 'bg-card', 'text-card-foreground', 'shadow-sm');
    card.setAttribute('data-v0-t', 'card');

    const cardBody = document.createElement('div');
    cardBody.classList.add('flex', 'flex-col', 'space-y-1.5', 'p-6');

    const cardHeader = document.createElement('div');
    cardHeader.classList.add('flex', 'items-center', 'space-x-2');

    const avatar = document.createElement('span');
    avatar.classList.add('relative', 'flex', 'shrink-0', 'overflow-hidden', 'rounded-full', 'w-10', 'h-10');
    avatar.setAttribute('src', '/placeholder.svg?height=50&width=50');
    avatar.setAttribute('alt', 'User Avatar');

    const title = document.createElement('h3');
    title.classList.add('text-2xl', 'font-semibold', 'leading-none', 'tracking-tight');
    title.innerText = community.title;

    cardHeader.appendChild(avatar);
    cardHeader.appendChild(title);
    cardBody.appendChild(cardHeader);
    
    const cardImage = document.createElement('img');
    const imgSrc = community.record.images ? community.record.images[0] : '/placeholder.svg?height=200&width=200';
    cardImage.classList.add('w-full', 'h-40', 'object-cover');
    cardImage.setAttribute('src', BASE_URL+imgSrc);
    cardImage.setAttribute('alt', 'Community Image');
    cardImage.setAttribute('width', '200');
    cardImage.setAttribute('height', '200');
    cardImage.setAttribute('style', 'aspect-ratio: 200 / 200; object-fit: cover');

    const cardDescription = document.createElement('p');
    cardDescription.classList.add('mt-2', 'text-sm', 'text-gray-500');
    cardDescription.innerText = community.content;

    const cardFooter = document.createElement('div');
    cardFooter.classList.add('flex', 'items-center', 'p-6');

    const readMore = document.createElement('a');
    readMore.classList.add('text-sm', 'text-blue-500');
    readMore.setAttribute('href', '/community/detail.html?id='+community.id);
    readMore.innerText = 'Read more';

    cardFooter.appendChild(readMore);

    const cardContent = document.createElement('div');
    cardContent.classList.add('p-6');

    cardContent.appendChild(cardImage);
    cardContent.appendChild(cardDescription);
    
    card.appendChild(cardBody);
    card.appendChild(cardContent);
    card.appendChild(cardFooter);

    return card;
}

function createPagination(data) {
    const pagination = document.createElement('div');
    pagination.classList.add('flex', 'items-center', 'justify-center', 'space-x-2', 'mt-8');

    const prev = document.createElement('a');
    prev.classList.add('inline-flex', 'items-center', 'justify-center', 'rounded-md', 'font-medium', 'ring-offset-background', 'transition-colors', 'focus-visible:outline-none', 'focus-visible:ring-2', 'focus-visible:ring-ring', 'focus-visible:ring-offset-2', 'disabled:pointer-events-none', 'disabled:opacity-50', 'bg-primary', 'text-primary-foreground', 'hover:bg-primary/90', 'h-10', 'px-4', 'py-2', 'text-sm');
    prev.innerText = 'Prev';
    if (data.previous) prev.setAttribute('href', '?page='+data.previous.slice(-1))
    else prev.classList.add('opacity-50', 'pointer-events-none');

    const next = document.createElement('a');
    next.classList.add('inline-flex', 'items-center', 'justify-center', 'rounded-md', 'font-medium', 'ring-offset-background', 'transition-colors', 'focus-visible:outline-none', 'focus-visible:ring-2', 'focus-visible:ring-ring', 'focus-visible:ring-offset-2', 'disabled:pointer-events-none', 'disabled:opacity-50', 'bg-primary', 'text-primary-foreground', 'hover:bg-primary/90', 'h-10', 'px-4', 'py-2', 'text-sm');
    next.innerText = 'Next';
    if (data.next) next.setAttribute('href', '?page='+data.next.slice(-1))
    else next.classList.add('opacity-50', 'pointer-events-none');
    
    const cur = document.createElement('div');
    cur.classList.add('inline-flex', 'items-center', 'rounded-full', 'border', 'px-2.5', 'py-0.5', 'w-fit', 'text-xs', 'font-semibold', 'transition-colors', 'focus:outline-none', 'focus:ring-2', 'focus:ring-ring', 'focus:ring-offset-2', 'border-transparent', 'bg-primary', 'text-primary-foreground', 'hover:bg-primary/80');
    cur.innerText = page;

    pagination.appendChild(prev);
    pagination.appendChild(cur);
    pagination.appendChild(next);

    return pagination;
}

async function getCommunityDetail() {
    if (!id) return;
    const res = await fetch(`${BASE_URL}/community/${id}/`)
    if (res.ok) {
        const data = await res.json();
        
        document.getElementById('title').innerText = data.title;
        document.getElementById('content').innerText = data.content;
        document.getElementById('profile').innerText = data.user.profile_image;
        document.getElementById('nickname').innerText = data.user.nickname;
        document.getElementById('created_at').innerText = data.created_at;
        document.getElementById('email').innerText = data.user.email;
    }
}


export {getCommunity, getCommunityDetail};