
export const generateCreativeIdeas = async (topic: string): Promise<string[]> => {
    if (!topic.trim()) {
        return [];
    }

    // Simulate a network delay to mimic an API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return a predefined list of mock ideas based on the topic
    const mockIdeas = [
        `Develop a mobile app that helps users track their progress in '${topic}'.`,
        `Create a subscription box service dedicated to products for '${topic}'.`,
        `Start a YouTube channel that features tutorials and tips about '${topic}'.`,
        `Write a comprehensive e-book on the advanced techniques of '${topic}'.`,
        `Host a series of online workshops focused on '${topic}'.`
    ];

    return mockIdeas;
};
