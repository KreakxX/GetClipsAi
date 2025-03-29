"use client";

import { useEffect, useState } from "react";
import { generateViralClips, validateToken } from "./Api";
import { Card, CardContent, CardHeader } from "./components/ui/card";
import {
  Download,
  Key,
  LinkIcon,
  Loader2,
  TrendingUp,
  Info,
  Instagram,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Checkbox } from "./components/ui/checkbox";
import { Badge } from "./components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { cn } from "./lib/utils";
import { useNavigate } from "react-router-dom";

export default function ClipsAi() {
  const [url, setUrl] = useState(
    "https://www.youtube.com/watch?v=2O_83t2ZrNM&t=8s"
  );
  const [videoId, setVideoId] = useState<string | null>("2O_83t2ZrNM");
  const videoSrc1 = "/Images/GeneratedClip_1.mp4";
  const videoSrc2 = "/Images/GeneratedClip_2.mp4";
  const videoSrc3 = "/Images/GeneratedClip_3.mp4";
  const videoSrc4 = "/Images/GeneratedClip_4.mp4";
  const videoSrc5 = "/Images/GeneratedClip_5.mp4";
  const videoSrc6 = "/Images/GeneratedClip_6.mp4";
  const [loading, setLoading] = useState(false);
  const [selectedLength, setSelectedLength] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const [activeTab, setActiveTab] = useState("generate");
  const navigate = useNavigate();

  const handleDownload = (clipNumber: number) => {
    const videoSrc =
      clipNumber === 1 ? videoSrc1 : clipNumber === 2 ? videoSrc2 : videoSrc3;

    const link = document.createElement("a");
    link.href = videoSrc;
    link.download = `GeneratedClip_${clipNumber}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generateViralAiClips = async () => {
    try {
      setLoading(true);
      await generateViralClips(url, selectedLength, keyword);
      setActiveTab("results");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (length: string) => {
    setSelectedLength((prev) => (prev === length ? "" : length));
  };

  useEffect(() => {
    if (url) {
      const id = extractYouTubeId(url);
      setVideoId(id);
    } else {
      setVideoId(null);
    }
  }, [url]);

  useEffect(() => {
    const validate = async () => {
      const response = await validateToken();
      console.log(response);
      if (response === false) {
        navigate("/");
      }
    };
    validate();
  }, []);

  const extractYouTubeId = (url: string): string | null => {
    const youtubeRegex =
      /(?:https?:\/\/(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]*\/\S+\/|\S+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/))([a-zA-Z0-9_-]{11})/;
    const match = url.match(youtubeRegex);
    return match ? match[1] : null;
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-indigo-50 to-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="py-12 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            GetClipsAi
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Transform your long-form videos into viral social media clips with
            AI
          </p>
        </header>

        <section className="py-12">
          <div className="text-center mb-10">
            <Badge
              variant="outline"
              className="mb-2 bg-indigo-50 text-indigo-700 border-indigo-200 px-3 py-1"
            >
              Why Choose Us
            </Badge>
            <h2 className="text-3xl font-bold text-slate-900">
              Powerful Features for Content Creators
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 ">
            {[
              {
                icon: <Info className="h-6 w-6 text-indigo-600" />,
                title: "Automatic Subtitles",
                description:
                  "Generate accurate subtitles for your clips with just one click",
              },
              {
                icon: <Instagram className="h-6 w-6 text-indigo-600" />,
                title: "Social Media Ready",
                description:
                  "Clips optimized for all major social platforms to maximize engagement",
              },
              {
                icon: <TrendingUp className="h-6 w-6 text-indigo-600" />,
                title: "Channel Growth",
                description:
                  "Proven strategies to increase your audience and engagement",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="bg-white  rounded-xl shadow-md shadow-indigo-600 transition-all duration-300  border"
              >
                <CardContent className="pt-6 ">
                  <div className="rounded-full w-12 h-12 bg-indigo-100 flex items-center justify-center mb-4 ">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-lg text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full "
        >
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 bg-indigo-600 ">
            <TabsTrigger value="generate">Generate Clips</TabsTrigger>
            <TabsTrigger value="results">View Results</TabsTrigger>
          </TabsList>

          <TabsContent value="generate">
            <Card className="bg-white border-none shadow-xl rounded-xl overflow-hidden mb-20">
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="youtube-url"
                      className="text-sm font-medium text-slate-700"
                    >
                      YouTube Video URL
                    </label>
                    <div className="flex items-center gap-2 relative">
                      <LinkIcon
                        className="absolute left-3 text-indigo-600"
                        size={18}
                      />
                      <Input
                        id="youtube-url"
                        onChange={(e) => setUrl(e.target.value)}
                        value={url}
                        placeholder="Enter YouTube URL"
                        className="pl-10 focus-visible:ring-2 focus-visible:ring-indigo-500 border-indigo-600"
                      />
                    </div>
                  </div>

                  {videoId ? (
                    <div className="rounded-lg overflow-hidden border border-slate-200 shadow-sm">
                      <iframe
                        className="w-full aspect-video"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title="YouTube Video"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="w-full aspect-video rounded-lg bg-slate-100 flex justify-center items-center border border-slate-200">
                      <p className="text-slate-500 font-medium">
                        No video found
                      </p>
                    </div>
                  )}

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="keyword"
                      className="text-sm font-medium text-slate-700"
                    >
                      Keyword for Clips
                    </label>
                    <div className="flex items-center gap-2 relative">
                      <Key
                        className="absolute left-3 text-indigo-600"
                        size={18}
                      />
                      <Input
                        id="keyword"
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="Enter keyword (e.g., funny, controversial, informative)"
                        className="pl-10 focus-visible:ring-2 focus-visible:ring-indigo-500 border-indigo-600"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-700">
                      Clip Length
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { id: "short", label: "Short (5-25s)" },
                        { id: "medium", label: "Medium (20-35s)" },
                        { id: "long", label: "Long (40-60s)" },
                      ].map((option) => (
                        <div
                          key={option.id}
                          className={cn(
                            "flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all",
                            selectedLength === option.id
                              ? "border-indigo-500 bg-indigo-50"
                              : "border-slate-200 hover:border-indigo-200"
                          )}
                          onClick={() => handleCheckboxChange(option.id)}
                        >
                          <Checkbox
                            id={option.id}
                            checked={selectedLength === option.id}
                            onCheckedChange={() =>
                              handleCheckboxChange(option.id)
                            }
                            className="sr-only"
                          />
                          <label
                            htmlFor={option.id}
                            className="text-sm font-medium cursor-pointer"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    disabled={
                      loading || !videoId || !selectedLength || !keyword
                    }
                    onClick={generateViralAiClips}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 rounded-lg flex items-center justify-center gap-2 w-full max-w-md mx-auto mt-4 text-lg font-medium"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" /> Generating...
                      </>
                    ) : (
                      <>
                        Generate Clips <ArrowRight className="ml-2" size={18} />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results">
            <div className="text-center mb-8">
              <Badge
                variant="outline"
                className="mb-2 bg-indigo-50 text-indigo-700 border-indigo-200 px-3 py-1"
              >
                Results
              </Badge>
              <h2 className="text-3xl font-bold text-slate-900">
                Your Generated Clips
              </h2>
              <p className="mt-2 text-sm text-slate-500 flex items-center justify-center gap-1">
                <Info size={14} />
                If clips aren't loading, try disabling cache in your browser's
                developer tools
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                videoSrc1,
                videoSrc2,
                videoSrc3,
                videoSrc4,
                videoSrc5,
                videoSrc6,
              ].map((src, index) => (
                <Card
                  key={index}
                  className="bg-white border-none rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all mb-20"
                >
                  <CardContent className="p-4">
                    <video
                      className="w-full aspect-video object-cover rounded-md mb-4"
                      controls
                      src={src}
                    />
                    <Button
                      variant="default"
                      className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors"
                      onClick={() => handleDownload(index + 1)}
                    >
                      <Download className="mr-2 h-4 w-4" /> Download Clip{" "}
                      {index + 1}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <section className="py-16">
          <div className="text-center mb-10">
            <Badge
              variant="outline"
              className="mb-2 bg-indigo-50 text-indigo-700 border-indigo-200 px-3 py-1"
            >
              Plans
            </Badge>
            <h2 className="text-3xl font-bold text-slate-900">
              Choose Your Plan
            </h2>
            <p className="mt-2 text-slate-600">
              Select the perfect plan for your content creation needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Free",
                price: "$0",
                color: "slate",
                popular: false,
                features: [
                  "5 Clips per day",
                  "Medium length maximum",
                  "Downloading allowed",
                  "15 min max video length",
                ],
              },
              {
                name: "Standard",
                price: "$4.99",
                originalPrice: "$6.99",
                color: "indigo",
                popular: true,
                features: [
                  "50 Clips per day",
                  "1 minute maximum length",
                  "Downloading allowed",
                  "45 min max video length",
                  "Custom keywords for clips",
                ],
              },
              {
                name: "Premium",
                price: "$12.99",
                color: "purple",
                popular: false,
                features: [
                  "Unlimited clips per day",
                  "1 minute maximum length",
                  "Downloading allowed",
                  "90 min max video length",
                  "Custom keywords for clips",
                  "Priority support",
                  "Direct social media upload",
                ],
              },
            ].map((plan, index) => (
              <Card
                key={index}
                className={cn(
                  "bg-white border-none shadow-md hover:shadow-lg transition-all relative overflow-hidden",
                  plan.popular && "scale-105 shadow-lg"
                )}
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1 bg-${plan.color}-600`}
                ></div>
                {plan.popular && (
                  <Badge className="absolute top-5 right-5 bg-indigo-100 text-indigo-700 border-0">
                    Popular
                  </Badge>
                )}
                <CardHeader className="pb-2">
                  <h3 className="text-xl font-bold text-slate-900">
                    {plan.name}
                  </h3>
                  <div className="mt-2">
                    {plan.originalPrice && (
                      <span className="text-sm line-through text-slate-500 mr-2">
                        {plan.originalPrice}
                      </span>
                    )}
                    <span className="text-4xl font-bold">
                      {plan.price}
                      <span className="text-sm font-normal text-slate-500">
                        /month
                      </span>
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mt-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <CheckCircle
                          className={`h-5 w-5 text-${plan.color}-600 mr-2 shrink-0 mt-0.5`}
                        />
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={cn(
                      "w-full mt-8",
                      plan.color === "indigo"
                        ? "bg-indigo-600 hover:bg-indigo-700"
                        : plan.color === "purple"
                        ? "bg-purple-600 hover:bg-purple-700"
                        : "bg-slate-800 hover:bg-slate-900"
                    )}
                  >
                    {plan.name === "Free" ? "Get Started" : "Buy Now"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
