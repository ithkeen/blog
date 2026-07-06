import codexWorkspace from "../assets/post-codex-workspace.webp";
import complexityOrder from "../assets/post-complexity-order.webp";
import knowledgeSystem from "../assets/post-knowledge-system.webp";
import longTermEngineering from "../assets/post-long-term-engineering.webp";
import writingDialogue from "../assets/post-writing-dialogue.webp";

type PostImage = typeof codexWorkspace;

export type PostVisual = {
  image: PostImage;
  alt: string;
};

const visuals: Record<string, PostVisual> = {
  "codex-workspace-peizhi": {
    image: codexWorkspace,
    alt: "雪白桌面上的半透明面板、终端窗口和梅花枝，象征 Codex workspace 配置。",
  },
  "zai-fuzadu-zhong-xunzhao-zhixu": {
    image: complexityOrder,
    alt: "雪面上的几何线条和逐渐成形的纸张路径，象征在复杂度中寻找秩序。",
  },
  "xiezuo-shi-yi-zhong-ziwo-duihua": {
    image: writingDialogue,
    alt: "冷光下的纸张、铅笔、墨碟和一枚梅花花瓣，象征写作中的自我对话。",
  },
  "chongjian-geren-zhishi-tixi": {
    image: knowledgeSystem,
    alt: "雪白桌面上的卡片、透明收纳盒和连接线，象征个人知识体系。",
  },
  "daima-zhiwai-gongchengshi-de-changqi-zhuyi": {
    image: longTermEngineering,
    alt: "冬日工作台上的机械铅笔、蓝图和梅花枝，象征工程师的长期主义。",
  },
};

const fallbackVisual: PostVisual = {
  image: knowledgeSystem,
  alt: "雪白桌面上的卡片、透明收纳盒和连接线，象征写作中的知识整理。",
};

export function getPostVisual(postId: string) {
  return visuals[postId] ?? fallbackVisual;
}
