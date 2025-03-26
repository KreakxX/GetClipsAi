"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { generateSubtitles, generateViralClips } from "./Api";
import { Card, CardContent, CardHeader } from "./components/ui/card";
import {
  Download,
  FileVideo,
  Key,
  Link,
  Loader2,
  TrendingUp,
  Info,
  Instagram,
  CheckCircle,
} from "lucide-react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Checkbox } from "./components/ui/checkbox";
import { Badge } from "./components/ui/badge";

const ClipsAi: React.FC = () => {
  const [url, setUrl] = useState(
    "https://www.youtube.com/watch?v=2O_83t2ZrNM&t=8s"
  );
  const [videoId, setVideoId] = useState<string | null>("2O_83t2ZrNM");
  const videoSrc1 = "/Images/GeneratedClip_1.mp4";
  const videoSrc2 = "/Images/GeneratedClip_2.mp4";
  const videoSrc3 = "/Images/GeneratedClip_3.mp4";
  const [loading, setLoading] = useState(false);
  const [selectedLength, setSelectedLength] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");

  const handleDownload = (a: number) => {
    const link = document.createElement("a");
    if (a === 1) {
      link.href = videoSrc1;
    }
    if (a === 2) {
      link.href = videoSrc2;
    }
    if (a === 3) {
      link.href = videoSrc3;
    }

    link.download = "GeneratedClip_" + a + ".mp4";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generateViralAiClips = async () => {
    try {
      setLoading(true);
      await generateViralClips(url, selectedLength, keyword);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  const GenerateSubtitles = async (url: string) => {
    try {
      await generateSubtitles(url);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleCheckboxChange = (length: string) => {
    setSelectedLength((prev) => (prev === length ? "" : length));
  };

  useEffect(() => {
    if (url) {
      const id = extractYouTubeId(url);
      setVideoId(id);
      console.log(videoId);
    } else {
      setVideoId(null);
    }
  }, [url, videoId]);

  const extractYouTubeId = (url: string): string | null => {
    const youtubeRegex =
      /(?:https?:\/\/(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]*\/\S+\/|\S+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/))([a-zA-Z0-9_-]{11})/;
    const match = url.match(youtubeRegex);
    return match ? match[1] : null;
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-200 to-slate-100 flex flex-col items-center">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="py-12 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
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
              className="mb-2 bg-purple-50 text-purple-700 border-purple-200 px-3 py-1"
            >
              Why Choose Us
            </Badge>
            <h2 className="text-3xl font-bold text-slate-900">
              Powerful Features for Content Creators
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white border border-indigo-500 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="rounded-full w-12 h-12 bg-purple-100 flex items-center justify-center mb-4">
                  <Info className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-lg text-slate-900 mb-2">
                  Automatic Subtitles
                </h3>
                <p className="text-slate-600">
                  Generate accurate subtitles for your clips with just one click
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-indigo-500 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="rounded-full w-12 h-12 bg-indigo-100 flex items-center justify-center mb-4">
                  <Instagram className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-lg text-slate-900 mb-2">
                  Social Media Ready
                </h3>
                <p className="text-slate-600">
                  Clips optimized for all major social platforms to maximize
                  engagement
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-indigo-500 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="rounded-full w-12 h-12 bg-violet-100 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-violet-600" />
                </div>
                <h3 className="font-semibold text-lg text-slate-900 mb-2">
                  Channel Growth
                </h3>
                <p className="text-slate-600">
                  Proven strategies to increase your audience and engagement
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-12">
          <Card className="bg-white border border-slate-200 shadow-md overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2">
                  <Link className="text-indigo-600" size={20} />
                  <Input
                    onChange={(e) => setUrl(e.target.value)}
                    value={url}
                    placeholder="Enter YouTube URL"
                    className="focus-visible:ring-2 focus-visible:ring-indigo-500 border-indigo-500"
                  />
                </div>

                {videoId ? (
                  <div className="rounded-lg overflow-hidden border border-slate-200">
                    <iframe
                      className="w-full aspect-video"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title="YouTube Video"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-video rounded-lg bg-slate-100 flex justify-center items-center border border-slate-200">
                    <p className="text-slate-500 font-medium">No video found</p>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Key className="text-indigo-600" size={20} />
                  <Input
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Enter keyword for clips (e.g., funny, controversial, informative)"
                    className="focus-visible:ring-2 focus-visible:ring-indigo-500 border-indigo-500"
                  />
                </div>

                <div className="flex flex-wrap justify-center gap-6 py-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="short"
                      checked={selectedLength === "short"}
                      onCheckedChange={() => handleCheckboxChange("short")}
                      className="data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                    />
                    <label
                      htmlFor="short"
                      className="text-sm font-medium text-slate-700"
                    >
                      Short (5-25s)
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="medium"
                      checked={selectedLength === "medium"}
                      onCheckedChange={() => handleCheckboxChange("medium")}
                      className="data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                    />
                    <label
                      htmlFor="medium"
                      className="text-sm font-medium text-slate-700"
                    >
                      Medium (20-35s)
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="long"
                      checked={selectedLength === "long"}
                      onCheckedChange={() => handleCheckboxChange("long")}
                      className="data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                    />
                    <label
                      htmlFor="long"
                      className="text-sm font-medium text-slate-700"
                    >
                      Long (40-60s)
                    </label>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button
                    disabled={loading}
                    onClick={generateViralAiClips}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2 rounded-lg flex items-center justify-center gap-2 w-full max-w-md"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" /> Generating...
                      </>
                    ) : (
                      <>
                        Generate Clips <FileVideo className="ml-2" size={18} />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="py-12">
          <div className="text-center mb-10">
            <Badge
              variant="outline"
              className="mb-2 bg-purple-50 text-purple-700 border-purple-200 px-3 py-1"
            >
              Results
            </Badge>
            <h2 className="text-3xl font-bold text-slate-900">
              View Generated Clips
            </h2>
            <p className="mt-2 text-sm text-slate-500 flex items-center justify-center gap-1">
              <Info size={14} />
              If clips aren't loading, try disabling cache in your browser's
              developer tools
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoSrc1 && (
              <Card className="bg-white border border-slate-200 shadow-sm overflow-hidden">
                <CardContent className="p-4">
                  <video
                    className="w-full aspect-video object-cover rounded-md mb-4"
                    controls
                    src={videoSrc1}
                  />
                  <div className="grid grid-cols-1 gap-2">
                    <Button
                      variant="outline"
                      className="border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                      onClick={() => handleDownload(1)}
                    >
                      <Download className="mr-2 h-4 w-4" /> Download Clip
                    </Button>
                    <Button
                      className="bg-indigo-600 hover:bg-indigo-700"
                      onClick={() => GenerateSubtitles(videoSrc1)}
                    >
                      Generate Subtitles
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {videoSrc2 && (
              <Card className="bg-white border border-slate-200 shadow-sm overflow-hidden">
                <CardContent className="p-4">
                  <video
                    className="w-full aspect-video object-cover rounded-md mb-4"
                    controls
                    src={videoSrc2}
                  />
                  <div className="grid grid-cols-1 gap-2">
                    <Button
                      variant="outline"
                      className="border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                      onClick={() => handleDownload(2)}
                    >
                      <Download className="mr-2 h-4 w-4" /> Download Clip
                    </Button>
                    <Button
                      className="bg-indigo-600 hover:bg-indigo-700"
                      onClick={() => GenerateSubtitles(videoSrc2)}
                    >
                      Generate Subtitles
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {videoSrc3 && (
              <Card className="bg-white border border-slate-200 shadow-sm overflow-hidden">
                <CardContent className="p-4">
                  <video
                    className="w-full aspect-video object-cover rounded-md mb-4"
                    controls
                    src={videoSrc3}
                  />
                  <div className="grid grid-cols-1 gap-2">
                    <Button
                      variant="outline"
                      className="border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                      onClick={() => handleDownload(3)}
                    >
                      <Download className="mr-2 h-4 w-4" /> Download Clip
                    </Button>
                    <Button
                      className="bg-indigo-600 hover:bg-indigo-700"
                      onClick={() => GenerateSubtitles(videoSrc3)}
                    >
                      Generate Subtitles
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        <section className="py-12">
          <div className="text-center mb-10">
            <Badge
              variant="outline"
              className="mb-2 bg-purple-50 text-purple-700 border-purple-200 px-3 py-1"
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
            <Card className="bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1 bg-slate-400"></div>
              <CardHeader className="pb-2">
                <h3 className="text-xl font-bold text-slate-900">Free</h3>
                <p className="text-4xl font-bold mt-2">
                  $0
                  <span className="text-sm font-normal text-slate-500">
                    /month
                  </span>
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mt-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-slate-400 mr-2 shrink-0 mt-0.5" />
                    <span className="text-slate-700">5 Clips per day</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-slate-400 mr-2 shrink-0 mt-0.5" />
                    <span className="text-slate-700">
                      Medium length maximum
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-slate-400 mr-2 shrink-0 mt-0.5" />
                    <span className="text-slate-700">Downloading allowed</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-slate-400 mr-2 shrink-0 mt-0.5" />
                    <span className="text-slate-700">
                      15 min max video length
                    </span>
                  </li>
                </ul>
                <Button className="w-full mt-8 bg-slate-800 hover:bg-slate-900">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white border border-indigo-200 shadow-md hover:shadow-lg transition-all relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1 bg-indigo-600"></div>
              <Badge className="absolute top-5 right-5 bg-indigo-100 text-indigo-700 border-0">
                Popular
              </Badge>
              <CardHeader className="pb-2">
                <h3 className="text-xl font-bold text-slate-900">Standard</h3>
                <div className="mt-2">
                  <span className="text-sm line-through text-slate-500 mr-2">
                    $6.99
                  </span>
                  <span className="text-4xl font-bold">
                    $4.99
                    <span className="text-sm font-normal text-slate-500">
                      /month
                    </span>
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mt-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 shrink-0 mt-0.5" />
                    <span className="text-slate-700">50 Clips per day</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 shrink-0 mt-0.5" />
                    <span className="text-slate-700">
                      1 minute maximum length
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 shrink-0 mt-0.5" />
                    <span className="text-slate-700">Downloading allowed</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 shrink-0 mt-0.5" />
                    <span className="text-slate-700">
                      45 min max video length
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 shrink-0 mt-0.5" />
                    <span className="text-slate-700">
                      Custom keywords for clips
                    </span>
                  </li>
                </ul>
                <Button className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700">
                  Buy Now
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1 bg-purple-600"></div>
              <CardHeader className="pb-2">
                <h3 className="text-xl font-bold text-slate-900">Premium</h3>
                <p className="text-4xl font-bold mt-2">
                  $12.99
                  <span className="text-sm font-normal text-slate-500">
                    /month
                  </span>
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mt-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-purple-600 mr-2 shrink-0 mt-0.5" />
                    <span className="text-slate-700">
                      Unlimited clips per day
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-purple-600 mr-2 shrink-0 mt-0.5" />
                    <span className="text-slate-700">
                      1 minute maximum length
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-purple-600 mr-2 shrink-0 mt-0.5" />
                    <span className="text-slate-700">Downloading allowed</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-purple-600 mr-2 shrink-0 mt-0.5" />
                    <span className="text-slate-700">
                      90 min max video length
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-purple-600 mr-2 shrink-0 mt-0.5" />
                    <span className="text-slate-700">
                      Custom keywords for clips
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-purple-600 mr-2 shrink-0 mt-0.5" />
                    <span className="text-slate-700">Priority support</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-purple-600 mr-2 shrink-0 mt-0.5" />
                    <span className="text-slate-700">
                      Direct social media upload
                    </span>
                  </li>
                </ul>
                <Button className="w-full mt-8 bg-purple-600 hover:bg-purple-700">
                  Buy Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ClipsAi;
