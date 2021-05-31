# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     IStack.Repo.insert!(%IStack.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias IStack.Account
alias IStack.Events

Account.create_user(%{
  name: "istack",
  password: "istack",
  type: "ADMIN",
})

tracks = [
  "advertising_101",
  "advertising_agencies",
  "afilliate_marketing",
  "content_marketing",
  "coversion_optimization",
  "design_for_growth",
  "ecommerce_d2c",
  "influencer_marketing",
  "lead_generation",
  "media_buying",
  "seo_sem",
  "future_advertising",  
  "stage_break"    
]

titles = [
  "The $35M Ecommerce Advertising Formula: How to Structure a Winning Ad Account (Full Campaign Stack)",
  "Discover the Only Engagement Metrics to Focus On With Email Marketing",
  "Incept Your Consumer’s Mind Through Psychographics and Data, and Maximize Your ROI",
  "How to Use Artificial Intelligence to Generate Ad Graphics, Copy, and Gauge Customer Impact",
  "Advertising is Dead ...Let Me Explain",
  "How to Turn Messenger and Instagram DM Into Your Most Profitable Revenue Streams [With Live Q&A]",
  "Influencer marketing is all about getting access to a fan base, not just an audience! [With Live Q&A]",
  "Influencer marketing is all about getting access to a fan base, not just an audience! [With Live Q&A]",
  "How Aphrodite’s Tech Is Disrupting the Ecommerce & Crowdfunding Space",
  "Create A Multi-Dimensional Brand Experience That Draws Customers And Spikes Conversion Optimization",
  "The Winning Creative Playbook: How to Test Your Way Into $1B in Revenue in 2021 & Beyond",
  "Coming Out on Top: Discover the 1,000 Ranking Factors Google Uses",  
  "Running Growth Experiments: What Factors to Bet On For Optimal Success"    
]

descriptions = [
  "Brands make mistakes but there are 3 deadly ones that completely obliterate ROAS and are extremely difficult to recover from. Lauren Schwartz will reveal what these top errors are and how to avoid them in your business. She’ll help you identify your brand’s hook and advise on the best way to present it. You will never again commit marketing suicide with TLDW creatives that make people scroll without paying attention to your ad. She’ll coach you on how to effectively explain what your product is about in a captivating way.",
  "In this nail-biter, Marisha Hassram will bring to you practical insights on why the world’s biggest companies such as Netflix, Amazon, and Airbnb are running thousands of experiments each month. She’ll highlight the biggest mistakes that even the pros still commit when it comes to experimentation. Hassram will show you how she’s hacking Mindvalley to $150M -- 45% yearly growth consistently, and how you can apply this method to your business.",
  "In this exclusive session led by Travis Chambers, you’ll see first-hand the findings from a study of 50,000 ads from the top 1% Shopify stores and $100M in spend on Chambers’ own ads. Travis will reveal the 7 ad types that are getting the most performance and the exact video length you need for each type. To top it off, you’ll receive key findings on copywriting such as grade reading level, key words and phrases, structure, and a whole lot more.",
  "In this nail-biter of a session, Tom Breeze will reveal the step-by-step “ADUCATE” formula to help you create killer video ads on a budget. He’ll give you the exact method to quickly find cold audiences that are ready to buy your products for maximum ROAS & Scale. You’ll walk away knowing how to “set & forget” campaigns so you can say goodbye to the dreaded ad fatigue once and for all.",
  "Hassan Aanbar reveals the exact strategy that triggered a traffic growth of 7000% in 6 months without building links. He’ll demonstrate what they did to fix all available errors on websites right away. You’ll find out how to leverage content to rank for more keywords and bring a landslide of traffic. Together with Aanbar, you’ll devise a plan to scale and rank for even more high-traffic keywords. If you’re looking to scale your traffic to a whole new level, this session is an absolute must.",
  "Video Game Advertising Made Easy: Get to Know the Developers & How to Best Collaborate Video game advertising comes down to understanding the very people who code those games. Jonathon Troughton will be your expert guide as you learn the top things video game developers care about - UA, time spent in-game, gamer loyalty, and retention D1-D180. You will understand the key considerations that video game developers value more than anything and how it affects their decision to place your advertising in their games. Troughton will dive deep into FPS, the complexity of tech install and updates, No RTB, bad ads compromising the game experience, and more. You’ll take away the blueprint for the optimal advertising creative experience for intrinsic in-game advertising from the perspective of both a video game developer and a gamer.",
  "Did you know that Instagram DMs and Facebook Messenger are some of the most powerful lead generation tools out there? In this invigorating session, Natasha Takahashi will teach you the winning 3-pillar chatbot automation strategy that will turn Messenger and Instagram DM into your most profitable revenue streams. You'll understand the first step to implementing each of the 3 pillars in the next 7 days and master the 6 levels of chatbot marketing.",
]

author_names = [
  "Mark Sakento",
  "Elon Taka",
  "Bill Windows",
  "Steve Punch",
  "Chan San",
  "Balake San",
  "Jake Kam",
  "Iron Plastic",
  "Silicon Nisya",
  "Yuhan Niya",
  "Silam Ikaw",
]

author_titles = [
  "CEO of Gamble",
  "Product Owner of Jamis",
  "Software Engineer",
  "Former Soldier",
  "Technician",
  "Debuggerist",
  "Coderist",
  "Talkerist",
  "Musician of Disney",
  "Drag Racer",
  "Tambay",
]

schedules = [
  ~T[09:00:00],
  ~T[09:30:00],
  ~T[10:00:00],
  ~T[10:30:00],
  ~T[11:00:00],
  ~T[11:30:00],
  ~T[12:00:00],
  ~T[12:30:00],
  ~T[13:00:00],
  ~T[13:30:00],
  ~T[14:00:00],
  ~T[14:30:00],
  ~T[15:00:00],
  ~T[15:30:00],
]

stages = ["stage_one", "stage_two", "stage_three"]

{:ok, event_1} = Events.create_event(%{date: ~N[2021-06-10 23:00:00], name: "some name"})
Enum.each(schedules, fn time ->
  {:ok, event_schedule} = Events.create_event_schedule_with_assoc(%{time: time}, event_1)
  Enum.each(stages, fn stage ->
    Events.create_schedule_topic_with_assoc(
      %{
        author_name: Enum.random(author_names),
        author_title: Enum.random(author_titles),
        description: Enum.random(descriptions),
        stage: stage,
        title: Enum.random(titles),
        track_type: Enum.random(tracks)
      },
      event_schedule
    )
  end)
end)
