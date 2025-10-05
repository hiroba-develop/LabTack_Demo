import type { components } from "../types/api";

type Channel = components["schemas"]["Channel"];
type OriginalMessage = components["schemas"]["Message"];
export interface Message extends OriginalMessage {
    parentId?: string | null;
}
type OriginalUser = components["schemas"]["User"];
export interface User extends OriginalUser {
    status?: 'online' | 'offline' | 'away' | 'busy';
}

// FileItemを拡張してurlプロパティを追加
// 本来はapi.ts(swagger)を修正すべきだが、一旦モックで対応
type OriginalFileItem = components["schemas"]["File"];
export interface FileItem extends OriginalFileItem {
    url?: string;
}

// --- DM機能用の型定義 ---
export interface Conversation {
    id: string;
    participantIds: string[];
    lastMessage: Message;
}

export type NotificationStatus = 'pending' | 'accepted' | 'declined';

export interface Notification {
    id: string;
    type: 'event_invitation';
    fromUserId: string;
    status: NotificationStatus;
    event: any;
    createdAt: Date;
}




export const mockUsers: Record<string, User> = {
  "user-0": {
    id: "user-0",
    name: "自分",
    avatarUrl: "https://randomuser.me/api/portraits/men/0.jpg",
    status: 'online',
  },
  "user-1": {
    id: "user-1",
    name: "佐藤 健",
    avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    status: 'away',
  },
  "user-2": {
    id: "user-2",
    name: "鈴木 一郎",
    avatarUrl: "https://randomuser.me/api/portraits/men/2.jpg",
    status: 'busy',
  },
  "user-3": {
    id: "user-3",
    name: "高橋 花子",
    avatarUrl: "https://randomuser.me/api/portraits/women/3.jpg",
    status: 'offline',
  },
};

export const mockChannels: Channel[] = [
  {
    id: "channel-1",
    name: "全体連絡",
    type: "file_link",
    parentId: null,
    children: [],
  },
  {
    id: "dir-1",
    name: "プロジェクトA",
    type: "directory",
    parentId: null,
    children: [
      {
        id: "channel-2",
        name: "進捗報告",
        type: "file_link",
        parentId: "dir-1",
        children: [],
      },
      {
        id: "channel-3",
        name: "技術調査",
        type: "file_link",
        parentId: "dir-1",
        children: [],
      },
    ],
  },
  {
    id: "dir-2",
    name: "論文輪読会",
    type: "directory",
    parentId: null,
    children: [
        {
            id: "channel-4",
            name: "CVPR 2024",
            type: "file_link",
            parentId: "dir-2",
            children: [],
        }
    ]
  },
  {
    id: "channel-5",
    name: "雑談",
    type: "file_link",
    parentId: null,
    children: [],
  },
];

export const mockMessages: Record<string, Message[]> = {
  "channel-1": [
    {
      id: "msg-1-1",
      channelId: "channel-1",
      userId: "user-1",
      content: "来週のゼミはハイブリッド開催とします。詳細は追って連絡します。",
      createdAt: "2024-07-30T10:00:00Z",
      parentId: null,
    },
    {
        id: "msg-1-2",
        channelId: "channel-1",
        userId: "user-2",
        content: "承知しました。",
        createdAt: "2024-07-30T10:05:00Z",
        parentId: 'msg-1-1',
    },
    {
      id: "msg-1-3",
      channelId: "channel-1",
      userId: "user-0",
      content: "参考資料としてPDFを共有します。[dummy.pdf]",
      createdAt: "2024-08-01T11:00:00Z",
      parentId: null,
    },
  ],
  "channel-2": [
    {
      id: "msg-2-1",
      channelId: "channel-2",
      userId: "user-3",
      content: "今週の進捗報告です。UIの基本設計が完了しました。スライドを添付します。[progress_report_w1.pptx]",
      createdAt: "2024-07-29T14:20:00Z",
      parentId: null,
    },
  ],
  "channel-3": [],
  "channel-4": [
    {
        id: "msg-4-1",
        channelId: "channel-4",
        userId: "user-2",
        content: "この論文、面白そうなので次回の輪読会で発表したいです。[link_to_paper.pdf]",
        createdAt: "2024-07-28T18:00:00Z",
        parentId: null,
    },
  ],
  "channel-5": [
    {
        id: "msg-5-1",
        channelId: "channel-5",
        userId: "user-1",
        content: "新しいコーヒーメーカー、誰か使いましたか？",
        createdAt: "2024-07-30T12:30:00Z",
        parentId: null,
      },
      {
        id: "msg-5-2",
        channelId: "channel-5",
        userId: "user-3",
        content: "使いました！とても良い香りでしたよ。",
        createdAt: "2024-07-30T12:35:00Z",
        parentId: 'msg-5-1',
      },
  ]
};

export const mockFiles: FileItem[] = [
    {
        id: 'file-root-1',
        name: 'LAB',
        type: 'folder',
        parentId: null,
        ownerId: 'system',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },
    {
        id: 'file-root-2',
        name: '共有ドキュメント',
        type: 'folder',
        parentId: null,
        ownerId: 'system',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },
    {
        id: 'file-1',
        name: '研究計画書.docx',
        type: 'file',
        parentId: 'file-root-2',
        ownerId: 'user-1',
        createdAt: '2024-07-20T11:00:00Z',
        updatedAt: '2024-07-21T15:00:00Z',
        url: 'https://file-examples.com/storage/fe52cb052ede64198424a15/2017/02/file-sample_100kB.docx',
    },
    {
        id: 'file-2',
        name: '実験データ',
        type: 'folder',
        parentId: 'file-root-2',
        ownerId: 'user-2',
        createdAt: '2024-07-22T09:00:00Z',
        updatedAt: '2024-07-22T09:00:00Z',
    },
    {
        id: 'file-3',
        name: '20240722_results.csv',
        type: 'file',
        parentId: 'file-2',
        ownerId: 'user-2',
        createdAt: '2024-07-22T09:05:00Z',
        updatedAt: '2024-07-22T09:05:00Z',
        url: '/dummy.csv',
    },
    {
        id: 'file-4',
        name: 'progress_report_w1.pptx',
        type: 'file',
        parentId: 'file-root-1',
        ownerId: 'user-3',
        createdAt: '2024-07-29T14:20:00Z',
        updatedAt: '2024-07-29T14:20:00Z',
        url: 'https://file-examples.com/storage/fe52cb052ede64198424a15/2017/02/file_example_PPTX_250kB.pptx',
    },
    {
        id: 'file-5',
        name: '年間予算.xlsx',
        type: 'file',
        parentId: 'file-root-2',
        ownerId: 'user-1',
        createdAt: '2024-07-25T18:00:00Z',
        updatedAt: '2024-07-25T18:00:00Z',
        url: 'https://file-examples.com/storage/fe52cb052ede64198424a15/2017/02/file_example_XLSX_10.xlsx',
    },
    {
        id: 'file-6',
        name: '会議メモ.txt',
        type: 'file',
        parentId: 'file-root-1',
        ownerId: 'user-0',
        createdAt: '2024-07-30T16:00:00Z',
        updatedAt: '2024-07-30T16:00:00Z',
        url: '/dummy.txt',
    },
    {
        id: 'file-7',
        name: 'link_to_paper.pdf',
        type: 'file',
        parentId: 'file-root-1', // Assuming it's in a relevant folder
        ownerId: 'user-2',
        createdAt: '2024-07-28T18:00:00Z',
        updatedAt: '2024-07-28T18:00:00Z',
        url: 'https://www.africau.edu/images/default/sample.pdf',
    },
    {
        id: 'file-8',
        name: 'dummy.pdf',
        type: 'file',
        parentId: 'file-root-1',
        ownerId: 'user-0',
        createdAt: '2024-08-01T10:00:00Z',
        updatedAt: '2024-08-01T10:00:00Z',
        url: 'https://pdfobject.com/pdf/sample.pdf',
    },
];

// --- DM Mock Data ---
const dmMessage1: Message = { id: 'dm-msg-1', userId: 'user-1', content: '明日の13時からミーティングお願いできますか？', createdAt: '2024-07-30T15:00:00Z' };
const dmMessage2: Message = { id: 'dm-msg-2', userId: 'user-0', content: 'はい、大丈夫です。場所はいつもの会議室で良いですか？', createdAt: '2024-07-30T15:02:00Z' };
const dmMessage3: Message = { id: 'dm-msg-3', userId: 'user-2', content: '先日の件、ご対応ありがとうございます！', createdAt: '2024-07-29T11:00:00Z' };

export const mockConversations: Conversation[] = [
    {
        id: 'conv-1',
        participantIds: ['user-0', 'user-1'],
        lastMessage: dmMessage2,
    },
    {
        id: 'conv-2',
        participantIds: ['user-0', 'user-2'],
        lastMessage: dmMessage3,
    },
    {
        id: 'conv-3',
        participantIds: ['user-0', 'user-3'],
        lastMessage: { id: 'dm-msg-4', userId: 'user-3', content: 'お疲れ様です！', createdAt: '2024-07-28T20:00:00Z' },
    }
];

export const mockDirectMessages: Record<string, Message[]> = {
    'conv-1': [
        dmMessage1,
        dmMessage2,
        { id: 'dm-msg-5', userId: 'user-1', content: 'はい、そちらでお願いします。', createdAt: '2024-07-30T15:03:00Z' },
    ],
    'conv-2': [
        dmMessage3,
    ],
    'conv-3': [
        { id: 'dm-msg-4', userId: 'user-3', content: 'お疲れ様です！', createdAt: '2024-07-28T20:00:00Z' },
    ]
};

// --- Notification Mock Data ---
const now = new Date();
export const mockNotifications: Notification[] = [
    {
        id: 'notif-1',
        type: 'event_invitation',
        fromUserId: 'user-2',
        status: 'pending',
        event: {
            id: 'event-5',
            title: '緊急ミーティング',
            start: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 18, 0, 0),
            end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 19, 0, 0),
            ownerId: 'user-2',
            participantIds: ['user-0', 'user-2']
        },
        createdAt: new Date(),
    },
    {
        id: 'notif-2',
        type: 'event_invitation',
        fromUserId: 'user-3',
        status: 'accepted',
        event: {
            id: 'event-6',
            title: '輪読会の打ち合わせ',
            start: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2, 11, 0, 0),
            end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2, 12, 0, 0),
            ownerId: 'user-3',
            participantIds: ['user-0', 'user-3']
        },
        createdAt: new Date(new Date().setDate(now.getDate() - 1)),
    }
];

