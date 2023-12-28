import { BASE_URL, securedApiRequest } from "../../js/common.js";

const urlSearch = new URLSearchParams(location.search);
const page = isNaN(urlSearch.get("page")) || !urlSearch.get("page") ? 1 : urlSearch.get("page");
const id = urlSearch.get("id");
const search = urlSearch.get("search");

async function getCommunity() {
    const params = urlSearch.has("search") ? "&search=" + search : "";
    document.getElementById("search").value = search;
    const data = await securedApiRequest(`/community/?page=${page}${params}`, "GET");
    
    for (const community of data.results) {
        const card = createCommunityCard(community);
        document.getElementById("community-list").appendChild(card);
    }
    const $pagination = createPagination(data);
    document.querySelector("footer").appendChild($pagination);
    document.getElementById("count").innerText = data.count + " items";

}

function createCommunityCard(community) {
    const card = document.createElement("div");
    card.classList.add(
        "rounded-lg",
        "border",
        "bg-card",
        "text-card-foreground",
        "shadow-sm"
    );
    card.setAttribute("data-v0-t", "card");

    const cardBody = document.createElement("div");
    cardBody.classList.add("flex", "flex-col", "space-y-1.5", "p-6");

    const cardHeader = document.createElement("div");
    cardHeader.classList.add("flex", "items-center", "space-x-2");

    const avatar = document.createElement("span");
    avatar.classList.add(
        "relative",
        "flex",
        "shrink-0",
        "overflow-hidden",
        "rounded-full",
        "w-10",
        "h-10"
    );
    avatar.setAttribute("src", "/placeholder.svg?height=50&width=50");
    avatar.setAttribute("alt", "User Avatar");

    const title = document.createElement("h3");
    title.classList.add(
        "text-2xl",
        "font-semibold",
        "leading-none",
        "tracking-tight"
    );
    title.innerText = community.title;

    cardHeader.appendChild(avatar);
    cardHeader.appendChild(title);
    cardBody.appendChild(cardHeader);

    const cardImage = document.createElement("img");
    const imgSrc = community.record.images
        ? community.record.images[0]
        : "/placeholder.svg?height=200&width=200";
    cardImage.classList.add("w-full", "h-40", "object-cover");
    cardImage.setAttribute("src", BASE_URL + imgSrc);
    cardImage.setAttribute("alt", "Community Image");
    cardImage.setAttribute("width", "200");
    cardImage.setAttribute("height", "200");
    cardImage.setAttribute(
        "style",
        "aspect-ratio: 200 / 200; object-fit: cover"
    );

    const cardDescription = document.createElement("p");
    cardDescription.classList.add("mt-2", "text-sm", "text-gray-500");
    cardDescription.innerText = community.content;

    const cardFooter = document.createElement("div");
    cardFooter.classList.add("flex", "items-center", "p-6");

    const readMore = document.createElement("a");
    readMore.classList.add("text-sm", "text-blue-500");
    readMore.setAttribute("href", "/community/detail.html?id=" + community.id);
    readMore.innerText = "Read more";

    cardFooter.appendChild(readMore);

    const cardContent = document.createElement("div");
    cardContent.classList.add("p-6");

    cardContent.appendChild(cardImage);
    cardContent.appendChild(cardDescription);

    card.appendChild(cardBody);
    card.appendChild(cardContent);
    card.appendChild(cardFooter);

    return card;
}

function createPagination(data) {
    const pagination = document.createElement("div");
    pagination.classList.add(
        "flex",
        "items-center",
        "justify-center",
        "space-x-2",
        "mt-8"
    );

    const prev = document.createElement("a");
    prev.classList.add(
        "inline-flex",
        "items-center",
        "justify-center",
        "rounded-md",
        "font-medium",
        "ring-offset-background",
        "transition-colors",
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-ring",
        "focus-visible:ring-offset-2",
        "disabled:pointer-events-none",
        "disabled:opacity-50",
        "bg-primary",
        "text-primary-foreground",
        "hover:bg-primary/90",
        "h-10",
        "px-4",
        "py-2",
        "text-sm"
    );
    prev.innerText = "Prev";
    if (data.previous)
        prev.setAttribute("href", "?page=" + data.previous.slice(-1));
    else prev.classList.add("opacity-50", "pointer-events-none");

    const next = document.createElement("a");
    next.classList.add(
        "inline-flex",
        "items-center",
        "justify-center",
        "rounded-md",
        "font-medium",
        "ring-offset-background",
        "transition-colors",
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-ring",
        "focus-visible:ring-offset-2",
        "disabled:pointer-events-none",
        "disabled:opacity-50",
        "bg-primary",
        "text-primary-foreground",
        "hover:bg-primary/90",
        "h-10",
        "px-4",
        "py-2",
        "text-sm"
    );
    next.innerText = "Next";
    if (data.next) next.setAttribute("href", "?page=" + data.next.slice(-1));
    else next.classList.add("opacity-50", "pointer-events-none");

    const cur = document.createElement("div");
    cur.classList.add(
        "inline-flex",
        "items-center",
        "rounded-full",
        "border",
        "px-2.5",
        "py-0.5",
        "w-fit",
        "text-xs",
        "font-semibold",
        "transition-colors",
        "focus:outline-none",
        "focus:ring-2",
        "focus:ring-ring",
        "focus:ring-offset-2",
        "border-transparent",
        "bg-primary",
        "text-primary-foreground",
        "hover:bg-primary/80"
    );
    cur.innerText = page;

    pagination.appendChild(prev);
    pagination.appendChild(cur);
    pagination.appendChild(next);

    return pagination;
}

async function getCommunityDetail() {
    if (!id) return;
    const data = await securedApiRequest(`/community/${id}/`, "GET");
    
    document.getElementById("title").innerText = data.title;
    document.getElementById("content").innerText = data.content;
    document.getElementById("profile").innerText = data.user.profile_image;
    document.getElementById("nickname").innerText = data.user.nickname;
    document.getElementById("created_at").innerText = data.created_at.replace("T", " ").slice(0, 19);
    document.getElementById("email").innerText = data.user.email;

    createCommentList(data.comments);

    document.getElementById("maps").setAttribute("src", BASE_URL+"/record/maps/"+data.record.id+"/");

}


export function addComment(f) {
    event.preventDefault();
    const comment_text = f.comment.value;
    const comment = { content: comment_text };
    comment.community = id;
    if (f.comment_id) comment.comment_parent = f.comment_id.value;
    
    fetch(`${BASE_URL}/community/comment/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
        body: JSON.stringify(comment),
    }).then((res) => {
        location.reload();
    });
}

function createCommentList(comments) {
    for (const comment of comments) {
        const $comment = createComment(comment);
        document.getElementById("comment-list").appendChild($comment);
    }
}

function createComment(comment) {
    const $comment = document.createElement("div");
    $comment.classList.add(
        "flex",
        "items-center",
        "gap-4",
        "p-4",
        "border-b",
        "border-gray-200"
    );

    const $content = document.createElement("div");
    $content.classList.add("flex", "flex-col", "space-y-1.5", "flex-grow");
    $content.innerText = comment.content;

    const $nickname = document.createElement("p");
    $nickname.classList.add("font-medium");
    $nickname.innerText = comment.user_username;

    // const $comment_btn = document.createElement("button");
    // $comment_btn.classList.add("bg-gray-300", "hover:bg-gray-400", "text-gray-800", "font-bold", "py-2", "px-4", "rounded", "inline-flex", "items-center");
    // $comment_btn.setAttribute("type", "button");
    // $comment_btn.setAttribute("id", comment.id);
    // $comment_btn.innerText = "Reply";
    // $comment_btn.addEventListener("click", () => {  
    //     const $comment_form = document.querySelector("#comment_form");
    //     $comment_form.parent_comment.value = comment.id;
    //     $comment_form.comment.focus();
    // });

    $comment.appendChild($nickname);
    $comment.appendChild($content);
    // $comment.appendChild($comment_btn);

    return $comment;
}

export async function getRecordList() {
    const res = await fetch(`${BASE_URL}/record/?page=${page}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
    });
    if (res.ok) {
        const data = await res.json();
        for (const record of data.results) {
            const card = createRecordCard(record);
            document.getElementById("record-list").appendChild(card);
        }
        const $pagination = createPagination(data);
        document.querySelector("#record-list").appendChild($pagination);
    }
}

function createRecordCard(record) {
    const $record = document.createElement("div");
    $record.classList.add(
        "flex",
        "items-center",
        "gap-4",
        "p-4",
        "border-b",
        "border-gray-200",
        "justify-between"
    );

    const $content = document.createElement("div");
    $content.classList.add("flex", "flex-col", "space-y-1.5", "flex-grow");
    $content.innerText = record.created_at.replace("T", " ").slice(0, 19);

    const $distance = document.createElement("p");
    $distance.classList.add("font-medium");
    $distance.innerText = Number(record.distance) + " km";

    const $record_btn = document.createElement("button");
    $record_btn.classList.add("bg-red-300", "hover:bg-red-400", "text-gray-800", "font-bold", "py-2", "px-4", "rounded", "inline-flex", "items-center");
    $record_btn.setAttribute("type", "button");
    $record_btn.setAttribute("id", record.id);
    $record_btn.innerText = "Select";
    $record_btn.addEventListener("click", () => {  
        const $record_form = document.querySelector("#write_form");
        $record_form.record.value = record.id;
        
        const maps = document.getElementById("maps")
        maps.style.display = "block";
        maps.setAttribute("src", BASE_URL+"/record/maps/"+record.id+"/");
    });

    $record.appendChild($content);
    $record.appendChild($distance);
    $record.appendChild($record_btn);

    return $record
}

export async function writeCommunity(f) {
    event.preventDefault();
    const community = {
        title: f.title.value,
        content: f.content.value,
        record: f.record.value,
    };
    
    const res = await fetch(`${BASE_URL}/community/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
        body: JSON.stringify(community),
    });
    if (res.ok) {
        location.href = "./index.html";
    }
}

export { getCommunity, getCommunityDetail };
