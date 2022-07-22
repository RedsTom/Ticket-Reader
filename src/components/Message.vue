<script lang="ts" setup>
import Avatar from './Avatar.vue'
import Embed from './Embed.vue'
import moment from 'moment'
import { marked } from 'marked'
import { sanitize } from 'dompurify'

interface Props {
    message: {
        author: {
            id: string;
            name: string;
            avatarUrl: string;
        },
        creationTimestamp: number;
        content: string;
        attachementUrls: string[];
        edited: boolean;
        messageType: 'MODERATION' | 'TARGET';
        embeds: {
            title?: string;
            description?: string;
            color?: number;
            fields?: {
                name: string;
                value: string;
                inline?: boolean;
            }[];
            timestamp?: string;
        }[]
    },
    colorClass: string;
}

// eslint-disable-next-line no-undef
const p = defineProps<Props>()
</script>

<template>
    <div class="message" :class="{[p.colorClass]: true}">
        <Avatar :url="p.message.author.avatarUrl" class="pp"/>
        <div class="right">
            <div class="user">
                <div class="username">{{ p.message.author.name }}</div>
                <div class="date">{{ moment(p.message.creationTimestamp).format('[Le] dddd DD MMMM YYYY [à] HH[:]mm[:]ss') }}</div>
                <div class="id">{{ p.message.author.id }}</div>
            </div>
            <div class="content">
                <div class="text-content" v-html="sanitize(marked(p.message.content))">
                </div>
                <div class="embeds">
                    <Embed v-for="embed in p.message.embeds" :key="JSON.stringify(embed)" :embed="embed"/>
                </div>
                <div class="attachements" v-if="p.message.attachementUrls.length > 0">
                    <a
                        class="attachement"
                        v-for="att in Object.entries(p.message.attachementUrls)"
                        :key="JSON.stringify(att[1])"
                        :href="att[1]" :style="`--bg: url(${att[1]})`">
                        <p>Pièce jointe #{{ att[0] }}</p>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '@/styles/colors';

.message {
    padding: .75rem;

    display: flex;
    grid-gap: 1rem;

    &:hover {
        background: transparentize($color: colors.$quite-black, $amount: .5);
    }

    border-left: .2rem solid;

    &.red {
        border-left-color: colors.$red;
    }
    &.blue {
        border-left-color: colors.$blue;
    }
    &.green {
        border-left-color: colors.$green;
    }

    .user {
        display: flex;
        align-items: flex-end;
        grid-gap: 1rem;

        padding-bottom: 1rem;

        .username:hover {
            text-decoration: underline;
        }

        .id, .date {
            font-size: .75rem;
        }
    }

    .embeds {
        display: flex;
        flex-direction: column;
        grid-gap: .5rem;
    }

    .attachements {
        display: flex;
        padding: .5rem 0;
        grid-gap: 1rem;

        .attachement {
            height: 8rem;
            width: 15rem;
            background-color: colors.$quite-black;
            border-radius: .5rem;
            color: white;

            transition: .2s;

            background-image: var(--bg);
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;

            display: flex;
            align-items: center;
            justify-content: center;

            p {
                opacity: .2;
                background-color: colors.$quite-black;
                padding: .5rem 2rem;

                transition: .2s;

                &:hover {
                   opacity: 1;
                }
            }
        }
    }
}
</style>
